"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppBar, AppBarType } from "@/components/AppBar";

export default function LoadingDesignPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // 진행률 애니메이션
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsComplete(true);
          clearInterval(interval);
          // 2초 후 이메일 입력 페이지로 이동
          setTimeout(() => {
            router.push("/email-input");
          }, 2000);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [router]);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex h-[calc(100vh-20px)] flex-col">
      <AppBar
        title="Step3. 디자인 완성"
        type={AppBarType.back}
        onClose={handleBack}
      />

      <main className="flex flex-1 flex-col items-center justify-center px-4">
        {/* 메인 텍스트 */}
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-[#121417]">
            {isComplete
              ? "제출이 완료되었습니다."
              : "최종 디자인을 진행중입니다.."}
          </h1>

          <div className="space-y-1 text-[#6B7684]">
            <p>조금만 기다려 주시면</p>
            <p>상품 상세페이지가 완성됩니다.</p>
          </div>
        </div>

        {/* 진행률 바 */}
        <div className="mt-8 w-full max-w-xs">
          <div className="h-1 w-full rounded-full bg-[#E5E8EB]">
            <div
              className="h-full rounded-full bg-[#121417] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
