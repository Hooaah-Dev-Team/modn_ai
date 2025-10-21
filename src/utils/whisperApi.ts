/**
 * Whisper API 유틸리티 함수
 */

export interface WhisperResponse {
  text?: string;
  result?: string;
  error?: string;
}

/**
 * 오디오 파일을 Whisper API로 전송하여 텍스트로 변환
 * @param audioBlob 오디오 Blob 객체
 * @param backendUrl 백엔드 URL (옵션, 기본값은 환경변수 사용)
 * @returns 변환된 텍스트
 */
export async function transcribeAudio(
  audioBlob: Blob,
  backendUrl?: string,
): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("audioData", audioBlob, `audio_${Date.now()}.webm`);

    const url = backendUrl || "/api/whisper";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API 오류: ${response.status}`);
    }

    const result: WhisperResponse = await response.json();

    // 다양한 응답 형식 지원
    return result.text || result.result || "";
  } catch (error) {
    console.error("Whisper API 오류:", error);
    throw new Error("음성 인식에 실패했습니다.");
  }
}

/**
 * 오디오 파일의 품질을 확인
 * @param audioBlob 오디오 Blob 객체
 * @param minSize 최소 크기 (바이트)
 * @returns 품질이 충분한지 여부
 */
export function isAudioQualityGood(
  audioBlob: Blob,
  minSize: number = 1000,
): boolean {
  return audioBlob.size >= minSize;
}

/**
 * 오디오 Blob을 파일로 다운로드 (디버깅용)
 * @param audioBlob 오디오 Blob 객체
 * @param filename 파일명
 */
export function downloadAudio(audioBlob: Blob, filename: string): void {
  const url = URL.createObjectURL(audioBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
