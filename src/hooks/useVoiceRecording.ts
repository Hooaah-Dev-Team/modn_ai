"use client";

import { useCallback, useRef, useState } from "react";

interface UseVoiceRecordingOptions {
  onTranscriptionComplete?: (text: string) => void;
  onError?: (error: string) => void;
}

export const useVoiceRecording = (options?: UseVoiceRecordingOptions) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = useCallback(async () => {
    try {
      // 마이크 권한 요청
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;
      audioChunksRef.current = [];

      // MediaRecorder 생성
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorderRef.current = mediaRecorder;

      // 오디오 청크 수집
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // 녹음 중지 시 처리
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        // 오디오 품질 체크 (최소 크기)
        if (audioBlob.size < 1000) {
          options?.onError?.("녹음된 오디오가 너무 짧습니다.");
          return;
        }

        // Whisper API로 전송
        await sendAudioToWhisper(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("녹음 시작 오류:", error);
      options?.onError?.("마이크 접근 권한이 필요합니다.");
    }
  }, [options]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // 스트림 정리
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    }
  }, [isRecording]);

  const sendAudioToWhisper = async (audioBlob: Blob) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("audioData", audioBlob, `audio_${Date.now()}.webm`);

      const response = await fetch("/api/whisper", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API 오류: ${response.status}`);
      }

      const result = await response.json();

      if (result.text) {
        options?.onTranscriptionComplete?.(result.text);
      } else if (result.result) {
        // Flutter 코드와 호환성을 위해
        options?.onTranscriptionComplete?.(result.result);
      }
    } catch (error) {
      console.error("Whisper API 오류:", error);
      options?.onError?.("음성 인식에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  return {
    isRecording,
    isLoading,
    startRecording,
    stopRecording,
    toggleRecording,
  };
};
