"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

import { AppBar, AppBarType } from "@/components/AppBar";
import { Checklist } from "@/components/Checklist";
import { Input } from "@/components/Input";
import { VoiceInputButton } from "@/components/VoiceInputButton";
import { cn } from "@/utils/cn";

const CHECKLIST_ITEMS = [
  [
    "회사와 상품의 이름은 무엇인가요?",
    "이 상품의 자랑거리 3가지를 말해주세요.\n(※ 원산지/인증/맛이나 향 등)",
    "이 상품은 누구에게 추천하나요?",
  ],
  [
    "생산자님을 소개해 주세요.",
    "어떤 계기로 이 상품을 생산하게 되셨나요?",
    "나만의 비법/노력 등이 있다면?",
  ],
  [
    "유통기한이나 보관방법을 알려주세요",
    "이 상품은 어떻게 활용하면 좋나요?",
    "용량, 옵션, 가격은 어떻게 되나요?",
    "택배사와 배송기간은요?",
  ],
];

export default function VoiceInputPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1~7 단계

  // Step 2 상태
  const [companyName, setCompanyName] = useState("");
  const [productName, setProductName] = useState("");
  const [feature1Title, setFeature1Title] = useState("");
  const [feature1Desc, setFeature1Desc] = useState("");
  const [feature2Title, setFeature2Title] = useState("");
  const [feature2Desc, setFeature2Desc] = useState("");
  const [feature3Title, setFeature3Title] = useState("");
  const [feature3Desc, setFeature3Desc] = useState("");

  // Step 4 상태
  const [producerInfo, setProducerInfo] = useState("");
  const [motivation, setMotivation] = useState("");
  const [secret, setSecret] = useState("");

  // Step 6 상태
  const [example1, setExample1] = useState("");
  const [example2, setExample2] = useState("");
  const [example3, setExample3] = useState("");

  // Step 7 상태
  const [category, setCategory] = useState("");
  const [spec, setSpec] = useState("");
  const [delivery, setDelivery] = useState("");

  // Refs for Step 2
  const companyNameRef = useRef<HTMLTextAreaElement>(null);
  const productNameRef = useRef<HTMLTextAreaElement>(null);
  const feature1TitleRef = useRef<HTMLTextAreaElement>(null);
  const feature1DescRef = useRef<HTMLTextAreaElement>(null);
  const feature2TitleRef = useRef<HTMLTextAreaElement>(null);
  const feature2DescRef = useRef<HTMLTextAreaElement>(null);
  const feature3TitleRef = useRef<HTMLTextAreaElement>(null);
  const feature3DescRef = useRef<HTMLTextAreaElement>(null);

  // Refs for Step 4
  const producerInfoRef = useRef<HTMLTextAreaElement>(null);
  const motivationRef = useRef<HTMLTextAreaElement>(null);
  const secretRef = useRef<HTMLTextAreaElement>(null);

  // Refs for Step 6
  const example1Ref = useRef<HTMLTextAreaElement>(null);
  const example2Ref = useRef<HTMLTextAreaElement>(null);
  const example3Ref = useRef<HTMLTextAreaElement>(null);

  // Refs for Step 7
  const categoryRef = useRef<HTMLTextAreaElement>(null);
  const specRef = useRef<HTMLTextAreaElement>(null);
  const deliveryRef = useRef<HTMLTextAreaElement>(null);

  const validateStep2 = () => {
    if (!companyName.trim()) {
      toast.error("회사 이름을 입력해주세요");
      companyNameRef.current?.focus();
      return false;
    }
    if (!productName.trim()) {
      toast.error("제품명을 입력해주세요");
      productNameRef.current?.focus();
      return false;
    }
    if (!feature1Title.trim()) {
      toast.error("핵심특징 1을 모두 입력해주세요");
      feature1TitleRef.current?.focus();
      return false;
    }
    if (!feature1Desc.trim()) {
      toast.error("핵심특징 1을 모두 입력해주세요");
      feature1DescRef.current?.focus();
      return false;
    }
    if (!feature2Title.trim()) {
      toast.error("핵심특징 2를 모두 입력해주세요");
      feature2TitleRef.current?.focus();
      return false;
    }
    if (!feature2Desc.trim()) {
      toast.error("핵심특징 2를 모두 입력해주세요");
      feature2DescRef.current?.focus();
      return false;
    }
    if (!feature3Title.trim()) {
      toast.error("핵심특징 3을 모두 입력해주세요");
      feature3TitleRef.current?.focus();
      return false;
    }
    if (!feature3Desc.trim()) {
      toast.error("핵심특징 3을 모두 입력해주세요");
      feature3DescRef.current?.focus();
      return false;
    }
    return true;
  };

  const validateStep4 = () => {
    if (!producerInfo.trim()) {
      toast.error("생산자 이름/출생 연을 입력해주세요");
      producerInfoRef.current?.focus();
      return false;
    }
    if (!motivation.trim()) {
      toast.error("계기를 입력해주세요");
      motivationRef.current?.focus();
      return false;
    }
    if (!secret.trim()) {
      toast.error("비법/노력을 입력해주세요");
      secretRef.current?.focus();
      return false;
    }
    return true;
  };

  const validateStep6 = () => {
    if (!example1.trim()) {
      toast.error("예시1을 입력해주세요");
      example1Ref.current?.focus();
      return false;
    }
    if (!example2.trim()) {
      toast.error("예시2를 입력해주세요");
      example2Ref.current?.focus();
      return false;
    }
    if (!example3.trim()) {
      toast.error("예시3을 입력해주세요");
      example3Ref.current?.focus();
      return false;
    }
    return true;
  };

  const validateStep7 = () => {
    if (!category.trim()) {
      toast.error("제품 카테고리를 입력해주세요");
      categoryRef.current?.focus();
      return false;
    }
    if (!spec.trim()) {
      toast.error("제품 스펙을 입력해주세요");
      specRef.current?.focus();
      return false;
    }
    if (!delivery.trim()) {
      toast.error("배송 정보를 입력해주세요");
      deliveryRef.current?.focus();
      return false;
    }
    return true;
  };

  const goToNextStep = () => {
    // 입력 페이지에서 유효성 검사

    if (step === 2 && !validateStep2()) return;
    if (step === 4 && !validateStep4()) return;
    if (step === 6 && !validateStep6()) return;
    if (step === 7 && !validateStep7()) return;

    if (step < 7) {
      setStep((prev) => prev + 1);
    } else {
      router.push("/category-select");
    }
  };

  const goToPrevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  const handleTranscriptionComplete = (text: string) => {
    console.log(text);
    goToNextStep();
  };

  const handleError = (error: string) => {
    toast.error(error);
    goToNextStep();
  };

  const isRecordPage = step === 1 || step === 3 || step === 5;

  const getRecordPageIndex = () => {
    if (step === 1) return 0;
    if (step === 3) return 1;
    if (step === 5) return 2;
    return 0;
  };

  const getTitle = () => {
    if (isRecordPage) return "Step1. 상세페이지 초안 글 작성";
    if (step === 2) return "1페이지";
    if (step === 4) return "4페이지";
    if (step === 6) return "6페이지";
    if (step === 7) return "7페이지";
    return "";
  };

  const renderRecordPage = () => (
    <main className="flex flex-1 flex-col px-4">
      <h1 className="mt-5 text-2xl font-bold text-[#121417]">
        다음의 내용을 자유롭게 말씀해주세요
      </h1>
      <div className="flex w-full flex-1 flex-col justify-center">
        {CHECKLIST_ITEMS[getRecordPageIndex()].map((item, index) => (
          <Checklist key={index} text={item} />
        ))}
      </div>
      <div className="flex justify-center">
        <VoiceInputButton
          onTranscriptionComplete={handleTranscriptionComplete}
          onError={handleError}
        />
      </div>
    </main>
  );

  const renderStep2 = () => (
    <main className="flex flex-1 flex-col overflow-y-auto px-4">
      <div className="mx-auto flex gap-3 py-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-2 w-2 rounded-full",
              index === 0 ? "bg-[#121417]" : "bg-[#DBE0E5]",
            )}
          />
        ))}
      </div>
      <h1 className="mt-5 mb-3 text-2xl leading-normal font-bold text-[#121417]">
        1.제품 기본 정보
      </h1>
      <div className="py-3">
        <Input
          ref={companyNameRef}
          title="1.회사 이름"
          value={companyName}
          onChange={setCompanyName}
        />
      </div>
      <div className="py-3">
        <Input
          ref={productNameRef}
          title="2.제품명"
          value={productName}
          onChange={setProductName}
        />
      </div>
      <h2 className="mt-5 mb-3 text-2xl leading-normal font-bold text-[#121417]">
        2.핵심 특징 키워드 3가지
      </h2>
      <div className="py-3">
        <Input
          ref={feature1TitleRef}
          title="🙌 핵심특징 1"
          value={feature1Title}
          onChange={setFeature1Title}
        />
        <Input
          ref={feature1DescRef}
          title="🙌 설명글"
          size="md"
          value={feature1Desc}
          onChange={setFeature1Desc}
        />
      </div>
      <div className="py-3">
        <Input
          ref={feature2TitleRef}
          title="🙌 핵심특징 2"
          value={feature2Title}
          onChange={setFeature2Title}
        />
        <Input
          ref={feature2DescRef}
          title="🙌 설명글"
          size="md"
          value={feature2Desc}
          onChange={setFeature2Desc}
        />
      </div>
      <div className="py-3">
        <Input
          ref={feature3TitleRef}
          title="🙌 핵심특징 3"
          value={feature3Title}
          onChange={setFeature3Title}
        />
        <Input
          ref={feature3DescRef}
          title="🙌 설명글"
          size="md"
          value={feature3Desc}
          onChange={setFeature3Desc}
        />
      </div>
      <div className="h-5" />
      <div className="flex justify-between py-3">
        <button
          className="w-20 rounded-full bg-[#F0F2F5] py-3 font-medium outline-none"
          onClick={goToPrevStep}
        >
          <span className="font-bold text-[#121417]">이전</span>
        </button>
        <button
          className="w-20 rounded-full bg-[#0A80ED] py-2 font-medium text-white outline-none"
          onClick={goToNextStep}
        >
          <span className="font-bold text-white">다음</span>
        </button>
      </div>
      <div className="h-10" />
    </main>
  );

  const renderStep4 = () => (
    <main className="flex flex-1 flex-col overflow-y-auto px-4">
      <div className="mx-auto flex gap-3 py-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-2 w-2 rounded-full",
              index === 1 ? "bg-[#121417]" : "bg-[#DBE0E5]",
            )}
          />
        ))}
      </div>
      <h1 className="mt-5 mb-3 text-2xl leading-normal font-bold text-[#121417]">
        3.생산자 스토리
      </h1>
      <div className="flex-1">
        <div className="py-3">
          <Input
            ref={producerInfoRef}
            title="1.생산자 이야기/철학 한 줄"
            value={producerInfo}
            onChange={setProducerInfo}
          />
        </div>
        <div className="py-3">
          <Input
            ref={motivationRef}
            title="2.한 줄을 뒷받침하는 스토리"
            size="xl"
            value={motivation}
            onChange={setMotivation}
          />
        </div>
        <div className="py-3">
          <Input
            ref={secretRef}
            title="3.비법/노력"
            size="lg"
            value={secret}
            onChange={setSecret}
          />
        </div>
      </div>
      <div className="h-5" />
      <div className="flex justify-between py-3">
        <button
          className="w-20 rounded-full bg-[#F0F2F5] py-3 font-medium outline-none"
          onClick={goToPrevStep}
        >
          <span className="font-bold text-[#121417]">이전</span>
        </button>
        <button
          className="w-20 rounded-full bg-[#0A80ED] py-2 font-medium text-white outline-none"
          onClick={goToNextStep}
        >
          <span className="font-bold text-white">다음</span>
        </button>
      </div>
    </main>
  );

  const renderStep6 = () => (
    <main className="flex flex-1 flex-col overflow-y-auto px-4">
      <div className="mx-auto flex gap-3 py-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-2 w-2 rounded-full",
              index === 2 ? "bg-[#121417]" : "bg-[#DBE0E5]",
            )}
          />
        ))}
      </div>
      <h1 className="mt-5 mb-3 text-2xl leading-normal font-bold text-[#121417]">
        4.제품 활용 가이드
      </h1>
      <div className="flex-1">
        <div className="py-3">
          <Input
            ref={example1Ref}
            title="1.예시1"
            size="md"
            value={example1}
            onChange={setExample1}
          />
        </div>
        <div className="py-3">
          <Input
            ref={example2Ref}
            title="2.예시2"
            size="md"
            value={example2}
            onChange={setExample2}
          />
        </div>
        <div className="py-3">
          <Input
            ref={example3Ref}
            title="3.예시3"
            size="md"
            value={example3}
            onChange={setExample3}
          />
        </div>
      </div>
      <div className="h-5" />
      <div className="flex justify-between py-3">
        <button
          className="w-20 rounded-full bg-[#F0F2F5] py-3 font-medium outline-none"
          onClick={goToPrevStep}
        >
          <span className="font-bold text-[#121417]">이전</span>
        </button>
        <button
          className="w-20 rounded-full bg-[#0A80ED] py-2 font-medium text-white outline-none"
          onClick={goToNextStep}
        >
          <span className="font-bold text-white">다음</span>
        </button>
      </div>
    </main>
  );

  const renderStep7 = () => (
    <main className="flex flex-1 flex-col overflow-y-auto px-4">
      <div className="mx-auto flex gap-3 py-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-2 w-2 rounded-full",
              index === 3 ? "bg-[#121417]" : "bg-[#DBE0E5]",
            )}
          />
        ))}
      </div>
      <h1 className="mt-5 mb-3 text-2xl leading-normal font-bold text-[#121417]">
        5.제품 스펙/배송 정보
      </h1>
      <div className="flex-1">
        <div className="py-3">
          <Input
            ref={categoryRef}
            title="1.제품 카테고리"
            value={category}
            onChange={setCategory}
          />
        </div>
        <div className="py-3">
          <Input
            ref={specRef}
            title="2.제품 스펙"
            size="lg"
            value={spec}
            onChange={setSpec}
          />
        </div>
        <div className="py-3">
          <Input
            ref={deliveryRef}
            title="3.배송 정보"
            size="lg"
            value={delivery}
            onChange={setDelivery}
          />
        </div>
      </div>
      <div className="h-5" />
      <div className="flex justify-between py-3">
        <button
          className="w-20 rounded-full bg-[#F0F2F5] py-3 font-medium outline-none"
          onClick={goToPrevStep}
        >
          <span className="font-bold text-[#121417]">이전</span>
        </button>
        <button
          className="w-20 rounded-full bg-[#0A80ED] py-2 font-medium text-white outline-none"
          onClick={goToNextStep}
        >
          <span className="font-bold text-white">다음</span>
        </button>
      </div>
    </main>
  );

  const renderContent = () => {
    if (isRecordPage) return renderRecordPage();
    if (step === 2) return renderStep2();
    if (step === 4) return renderStep4();
    if (step === 6) return renderStep6();
    if (step === 7) return renderStep7();
    return null;
  };

  return (
    <div className="flex h-[calc(100vh-20px)] flex-col">
      <AppBar
        title={getTitle()}
        type={isRecordPage ? AppBarType.back : AppBarType.close}
        onClose={goToPrevStep}
      />
      {renderContent()}
    </div>
  );
}
