"use client";

import { useRouter } from "next/navigation";

import { AppBar, AppBarType } from "@/components/AppBar";

export default function SubmissionCompletePage() {
  const router = useRouter();

  return (
    <div className="flex h-[calc(100vh-20px)] flex-col">
      <AppBar
        title="Step3. 디자인 완성"
        type={AppBarType.close}
        onClose={() => router.push("/")}
      />

      <main className="mt-40 flex flex-1 flex-col items-center px-4 text-center">
        {/* 체크 아이콘 */}
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#0A80ED]">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6L9 17L4 12"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* 메인 텍스트 */}
        <div>
          <h1 className="mb-6 text-2xl font-bold text-[#121417]">
            제출이 완료되었습니다.
          </h1>

          <div className="space-y-1 text-lg text-[#6B7684]">
            <p>조금만 기다려 주시면</p>
            <p>상품 상세페이지가 이메일로 발송됩니다.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
