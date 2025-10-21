"use client";

import { useVoiceRecording } from "@/hooks/useVoiceRecording";
import { cn } from "@/utils/cn";

interface VoiceInputButtonProps {
  onTranscriptionComplete: (text: string) => void;
  onError?: (error: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function VoiceInputButton({
  onTranscriptionComplete,
  onError,
  className,
  size = "md",
}: VoiceInputButtonProps) {
  const { isRecording, isLoading, toggleRecording } = useVoiceRecording({
    onTranscriptionComplete,
    onError,
  });

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20",
  };

  return (
    <button
      onClick={toggleRecording}
      disabled={isLoading}
      className={cn(
        "flex items-center justify-center rounded-full transition-all duration-200",
        "shadow-lg hover:shadow-xl",
        "disabled:cursor-not-allowed disabled:opacity-50",
        sizeClasses[size],
        isRecording
          ? "animate-pulse bg-red-500 hover:bg-red-600"
          : "bg-blue-500 hover:bg-blue-600",
        isLoading && "cursor-wait opacity-50",
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
        <svg
          className="h-6 w-6 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
}
