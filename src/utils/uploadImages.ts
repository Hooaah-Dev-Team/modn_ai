export async function uploadImages(
  imageFiles: File[],
): Promise<string[] | null> {
  try {
    const formData = new FormData();

    // 모든 이미지를 "images" 필드에 추가
    for (const image of imageFiles) {
      formData.append("images", image);
    }

    // Next.js API Route로 전송 (서버에서 백엔드로 전달)
    const response = await fetch("/api/upload-images", {
      method: "POST",
      body: formData,
    });

    if (response.status === 201) {
      const imagesUrl: string[] = await response.json();
      return imagesUrl;
    } else {
      const errorData = await response.json();
      console.error("이미지 업로드 실패:", errorData);
      return null;
    }
  } catch (error) {
    console.error("이미지 업로드 에러:", error);
    return null;
  }
}
