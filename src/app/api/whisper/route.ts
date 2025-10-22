import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audioData") as File;

    console.log("===== Whisper API 요청 수신 =====");
    console.log("audioFile 존재:", !!audioFile);
    if (audioFile) {
      console.log("파일명:", audioFile.name);
      console.log("파일 타입:", audioFile.type);
      console.log("파일 크기:", audioFile.size);
    }
    console.log("================================");

    if (!audioFile) {
      return NextResponse.json(
        { error: "오디오 파일이 없습니다." },
        { status: 400 },
      );
    }

    // 백엔드 URL 가져오기
    const backendUrl = process.env.DURUMO_BACKEND_BASE;
    if (!backendUrl) {
      return NextResponse.json(
        { error: "백엔드 URL이 설정되지 않았습니다." },
        { status: 500 },
      );
    }

    // 백엔드로 전달할 FormData 생성
    const backendFormData = new FormData();
    // Flutter에서 사용하는 것과 동일한 필드명 사용
    backendFormData.append("audioData", audioFile, audioFile.name);

    console.log("===== 백엔드로 전송 시작 =====");
    console.log("URL:", `${backendUrl}/openai/whisper`);
    console.log("필드명: audioData");
    console.log("파일 타입:", audioFile.type);
    console.log("============================");

    // 백엔드 Whisper API로 전송
    const response = await fetch(`${backendUrl}/openai/whisper`, {
      method: "POST",
      body: backendFormData,
    });

    console.log("===== 백엔드 응답 수신 =====");
    console.log("Status:", response.status);
    console.log("============================");

    if (!response.ok) {
      const errorText = await response.text();
      console.error("===== 백엔드 API 오류 상세 =====");
      console.error("Status:", response.status);
      console.error("Error:", errorText);
      console.error("================================");
      return NextResponse.json(
        { error: "음성 인식에 실패했습니다.", details: errorText },
        { status: response.status },
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Whisper API 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
