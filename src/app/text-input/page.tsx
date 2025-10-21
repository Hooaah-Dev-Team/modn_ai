"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { AppBar, AppBarType } from "@/components/AppBar";

export default function TextInputPage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex h-[calc(100vh-20px)] flex-col">
      <AppBar title="Step1. 상세페이지 초안 글 작성" type={AppBarType.close} />
      <main className="flex flex-1 flex-col items-center px-4">
        <h1 className="my-5 text-2xl leading-snug font-bold">
          글을 작성해 주세요
        </h1>
        <div className="flex w-full flex-1 flex-col px-3">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full h-full w-full resize-none rounded-lg bg-[#D9D9D9] p-2 outline-none focus:border-2 focus:border-black"
          />
        </div>
        <div className="h-5" />
        <button
          onClick={() => router.push("/voice-input")}
          className="my-3 h-12 w-full rounded-full bg-[#0A80ED]"
        >
          <span className="leading-normal font-bold text-white">확인</span>
        </button>
      </main>
    </div>
  );
}
