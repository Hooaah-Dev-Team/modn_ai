"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

import { AppBar, AppBarType } from "@/components/AppBar";
import { Input } from "@/components/Input";

export default function EmailInputPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("이름을 입력해주세요");
      nameRef.current?.focus();
      return false;
    }
    if (!email.trim()) {
      toast.error("이메일 주소를 입력해주세요");
      emailRef.current?.focus();
      return false;
    }
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("올바른 이메일 주소를 입력해주세요");
      emailRef.current?.focus();
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // TODO: 이메일 전송 로직
    router.push("/submission-complete");
  };

  return (
    <div className="flex h-[calc(100vh-20px)] flex-col">
      <AppBar
        title="Step3. 디자인 완성"
        type={AppBarType.back}
        onClose={() => router.back()}
      />

      <main className="mt-20 flex flex-1 flex-col px-4 pb-4 text-center">
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
            ref={nameRef}
            title=""
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="이름을 입력해 주세요"
            type="text"
          />
          <Input
            ref={emailRef}
            title=""
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="이메일 주소를 입력해 주세요"
            type="email"
          />
        </div>

        {/* 하단 입력하기 버튼 */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="h-14 w-full rounded-full bg-[#0A80ED] font-bold text-white transition-all"
          >
            입력하기
          </button>
        </div>
      </main>
    </div>
  );
}
