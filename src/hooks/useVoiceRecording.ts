"use client";

import { useSetAtom } from "jotai";
import { useCallback, useRef, useState } from "react";

import {
  transcribedTextPart1Atom,
  transcribedTextPart2Atom,
  transcribedTextPart3Atom,
} from "@/atoms/voiceInputAtoms";

interface TranscriptionResult {
  [key: string]: string;
}

interface UseVoiceRecordingOptions {
  onTranscriptionComplete?: (data: TranscriptionResult) => void;
  onError?: (error: string) => void;
  endpoint: string;
}

export const useVoiceRecording = ({
  onTranscriptionComplete,
  onError,
  endpoint,
}: UseVoiceRecordingOptions) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // Transcribed text atoms
  const setTranscribedTextPart1 = useSetAtom(transcribedTextPart1Atom);
  const setTranscribedTextPart2 = useSetAtom(transcribedTextPart2Atom);
  const setTranscribedTextPart3 = useSetAtom(transcribedTextPart3Atom);

  const sendAudioToWhisper = useCallback(
    async (audioBlob: Blob) => {
      try {
        setIsLoading(true);

        // MIME 타입에 따라 파일 확장자 결정
        let extension = "webm";
        if (audioBlob.type.includes("mp4")) {
          extension = "m4a";
        } else if (audioBlob.type.includes("ogg")) {
          extension = "ogg";
        } else if (audioBlob.type.includes("wav")) {
          extension = "wav";
        }

        const formData = new FormData();
        formData.append(
          "audioData",
          audioBlob,
          `audio_${Date.now()}.${extension}`,
        );

        // 1단계: Whisper API로 음성을 텍스트로 변환
        const whisperResponse = await fetch("/api/whisper", {
          method: "POST",
          body: formData,
        });

        if (!whisperResponse.ok) {
          throw new Error(`Whisper API 오류: ${whisperResponse.status}`);
        }

        const whisperResult = await whisperResponse.json();
        const transcribedText = whisperResult.text || whisperResult.result;

        if (!transcribedText) {
          throw new Error("음성 인식 결과가 없습니다.");
        }

        // transcribedText를 endpoint에 따라 저장
        if (endpoint.includes("part1")) {
          setTranscribedTextPart1(transcribedText);
        } else if (endpoint.includes("part2")) {
          setTranscribedTextPart2(transcribedText);
        } else if (endpoint.includes("part3")) {
          setTranscribedTextPart3(transcribedText);
        }

        // 2단계: 변환된 텍스트를 지정된 엔드포인트로 전송
        const finalResponse = await fetch(
          process.env.NEXT_PUBLIC_DURUMO_BACKEND_BASE + endpoint,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ voiceText: transcribedText }),
          },
        );

        if (!finalResponse.ok) {
          throw new Error(`API 오류: ${finalResponse.status}`);
        }

        const result = await finalResponse.json();
        if (result) {
          onTranscriptionComplete?.(result.data);
        }
      } catch (error) {
        console.error("음성 처리 오류:", error);
        onError?.("음성 인식에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    },
    [
      endpoint,
      onError,
      onTranscriptionComplete,
      setTranscribedTextPart1,
      setTranscribedTextPart2,
      setTranscribedTextPart3,
    ],
  );

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

      // 브라우저가 지원하는 오디오 형식 확인
      let mimeType = "audio/webm";
      if (MediaRecorder.isTypeSupported("audio/mp4")) {
        mimeType = "audio/mp4";
      } else if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
        mimeType = "audio/webm;codecs=opus";
      } else if (MediaRecorder.isTypeSupported("audio/ogg;codecs=opus")) {
        mimeType = "audio/ogg;codecs=opus";
      }

      // MediaRecorder 생성
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: mimeType,
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
          type: mimeType,
        });

        // 오디오 품질 체크 (최소 크기)
        if (audioBlob.size < 1000) {
          onError?.("녹음된 오디오가 너무 짧습니다.");
          return;
        }

        // Whisper API로 전송
        await sendAudioToWhisper(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("녹음 시작 오류:", error);
      onError?.("마이크 접근 권한이 필요합니다.");
    }
  }, [onError, sendAudioToWhisper]);

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
