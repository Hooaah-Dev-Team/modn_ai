import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audioData") as File;

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
    backendFormData.append("audioData", audioFile);

    // 백엔드 Whisper API로 전송
    const response = await fetch(`${backendUrl}/openai/whisper`, {
      method: "POST",
      body: backendFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("백엔드 API 오류:", response.status, errorText);
      return NextResponse.json(
        { error: "음성 인식에 실패했습니다." },
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
