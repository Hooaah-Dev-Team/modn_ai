"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppBar, AppBarType } from "@/components/AppBar";
import { Input } from "@/components/Input";

export default function EmailInputPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (name.trim() && email.trim()) {
      // TODO: 이메일 전송 로직
      router.push("/");
    }
  };

  return (
    <div className="flex h-[calc(100vh-20px)] flex-col">
      <AppBar
        title="Step3. 디자인 완성"
        type={AppBarType.back}
        onClose={() => router.back()}
      />

      <main className="flex flex-1 flex-col px-4 pb-4">
        {/* 메인 텍스트 */}
        <div className="mt-6 mb-8">
          <h1 className="mb-3 text-2xl font-bold text-[#121417]">
            상품 상세페이지를 작업중입니다!
          </h1>
          <div className="space-y-1 text-[#121417]">
            <p>상세페이지를 작업중입니다.</p>
            <p>결과물을 받아볼 이메일 주소를 입력해주세요.</p>
          </div>
        </div>

        {/* 입력 필드들 */}
        <div className="flex-1 space-y-4">
          <Input
            title="이름"
            value={name}
            onChange={setName}
            placeholder="이름을 입력해 주세요"
            type="text"
          />
          <Input
            title="이메일"
            value={email}
            onChange={setEmail}
            placeholder="이메일 주소를 입력해 주세요"
            type="email"
          />
        </div>

        {/* 하단 입력하기 버튼 */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            disabled={!name.trim() || !email.trim()}
            className={`h-14 w-full rounded-full font-bold transition-all ${
              name.trim() && email.trim()
                ? "bg-[#0A80ED] text-white"
                : "cursor-not-allowed bg-[#E5E8EB] text-[#B0B8C1]"
            }`}
          >
            입력하기
          </button>
        </div>
      </main>
    </div>
  );
}
