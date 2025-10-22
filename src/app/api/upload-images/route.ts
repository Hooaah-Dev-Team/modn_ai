import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const images = formData.getAll("images") as File[];

    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: "이미지 파일이 없습니다." },
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
    for (const image of images) {
      backendFormData.append("images", image);
    }

    // 백엔드 이미지 업로드 API로 전송
    const response = await fetch(`${backendUrl}/upload/images`, {
      method: "POST",
      body: backendFormData,
    });

    if (response.status !== 201) {
      const errorText = await response.text();
      console.error("백엔드 API 오류:", response.status, errorText);
      return NextResponse.json(
        { error: "이미지 업로드에 실패했습니다." },
        { status: response.status },
      );
    }

    const imagesUrl: string[] = await response.json();

    // 디버깅: 업로드된 파일 경로 출력
    console.log("===== 이미지 업로드 성공 =====");
    console.log("업로드된 파일 개수:", imagesUrl.length);
    imagesUrl.forEach((url, index) => {
      console.log(`[${index + 1}] ${url}`);
    });
    console.log("============================");

    return NextResponse.json(imagesUrl, { status: 201 });
  } catch (error) {
    console.error("이미지 업로드 API 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

