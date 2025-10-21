"use client";

import { VoiceInputButton } from "@/components/VoiceInputButton";
import { useState } from "react";

export default function VoiceInputPage() {
  const [inputText, setInputText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleTranscription = (text: string) => {
    setInputText((prev) => prev + text);
    setErrorMessage("");
  };

  const handleError = (error: string) => {
    setErrorMessage(error);
  };

  const clearText = () => {
    setInputText("");
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* 메인 카드 */}
        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          {/* 입력 영역 */}
          <div className="mb-6">
            <label
              htmlFor="textInput"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              변환된 텍스트
            </label>
            <textarea
              id="textInput"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="음성으로 입력된 텍스트가 여기에 표시됩니다..."
              className="h-64 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              rows={10}
            />
          </div>

          {/* 에러 메시지 */}
          {errorMessage && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-600">{errorMessage}</p>
            </div>
          )}

          {/* 컨트롤 영역 */}
          <div className="flex items-center justify-between">
            <VoiceInputButton
              onTranscriptionComplete={handleTranscription}
              onError={handleError}
              size="lg"
            />

            {/* 지우기 버튼 */}
            <button
              onClick={clearText}
              className="rounded-lg bg-gray-500 px-6 py-2 text-white transition-colors hover:bg-gray-600"
            >
              지우기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
