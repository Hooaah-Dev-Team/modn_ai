"use client";

import Image from "next/image";

import micIcon from "@/assets/icons/mic.svg";
import { useVoiceRecording } from "@/hooks/useVoiceRecording";
import { cn } from "@/utils/cn";

interface TranscriptionResult {
  [key: string]: string;
}

interface VoiceInputButtonProps {
  onTranscriptionComplete: (data: TranscriptionResult) => void;
  onError?: (error: string) => void;
  className?: string;
  endpoint: string;
}

export function VoiceInputButton({
  onTranscriptionComplete,
  onError,
  className,
  endpoint,
}: VoiceInputButtonProps) {
  const { isRecording, isLoading, toggleRecording } = useVoiceRecording({
    onTranscriptionComplete,
    onError,
    endpoint,
  });

  return (
    <button
      onClick={toggleRecording}
      disabled={isLoading}
      className={cn(
        "my-5 flex items-center justify-center rounded-full p-4 transition-all duration-200",
        "shadow-lg hover:shadow-xl",
        "disabled:cursor-not-allowed disabled:opacity-50",
        isRecording
          ? "animate-pulse bg-red-500 hover:bg-red-600"
          : "bg-blue-500 hover:bg-blue-600",
        isLoading && "cursor-wait pr-4 opacity-50",
        className,
      )}
      aria-label={isRecording ? "녹음 중지" : "녹음 시작"}
      type="button"
    >
      {isLoading ? (
        <svg
          className="h-6 w-6 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <div className="flex gap-4">
          <Image src={micIcon} alt="Mic Icon" />
          <span className="pr-2 leading-normal font-bold text-white">
            {isRecording ? "중지" : "말하기"}
          </span>
        </div>
      )}
    </button>
  );
}
