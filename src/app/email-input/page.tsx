"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

import {
  categoryAtom,
  companyNameAtom,
  customUserTextAtom,
  deliveryAtom,
  example1Atom,
  example2Atom,
  example3Atom,
  feature1DescAtom,
  feature1TitleAtom,
  feature2DescAtom,
  feature2TitleAtom,
  feature3DescAtom,
  feature3TitleAtom,
  motivationAtom,
  producerInfoAtom,
  productDetailImagesAtom,
  productionSiteImagesAtom,
  productNameAtom,
  productUsageImagesAtom,
  secretAtom,
  sellerImagesAtom,
  specAtom,
  stepAtom,
  transcribedTextPart1Atom,
  transcribedTextPart2Atom,
  transcribedTextPart3Atom,
} from "@/atoms/voiceInputAtoms";
import { AppBar, AppBarType } from "@/components/AppBar";
import { Input } from "@/components/Input";

export default function EmailInputPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Atom values
  const companyName = useAtomValue(companyNameAtom);
  const productName = useAtomValue(productNameAtom);
  const feature1Title = useAtomValue(feature1TitleAtom);
  const feature1Desc = useAtomValue(feature1DescAtom);
  const feature2Title = useAtomValue(feature2TitleAtom);
  const feature2Desc = useAtomValue(feature2DescAtom);
  const feature3Title = useAtomValue(feature3TitleAtom);
  const feature3Desc = useAtomValue(feature3DescAtom);
  const producerInfo = useAtomValue(producerInfoAtom);
  const motivation = useAtomValue(motivationAtom);
  const secret = useAtomValue(secretAtom);
  const example1 = useAtomValue(example1Atom);
  const example2 = useAtomValue(example2Atom);
  const example3 = useAtomValue(example3Atom);
  const category = useAtomValue(categoryAtom);
  const spec = useAtomValue(specAtom);
  const delivery = useAtomValue(deliveryAtom);
  const transcribedTextPart1 = useAtomValue(transcribedTextPart1Atom);
  const transcribedTextPart2 = useAtomValue(transcribedTextPart2Atom);
  const transcribedTextPart3 = useAtomValue(transcribedTextPart3Atom);
  const productDetailImages = useAtomValue(productDetailImagesAtom);
  const productionSiteImages = useAtomValue(productionSiteImagesAtom);
  const sellerImages = useAtomValue(sellerImagesAtom);
  const productUsageImages = useAtomValue(productUsageImagesAtom);
  const customUserText = useAtomValue(customUserTextAtom);

  // Atom setters for reset
  const setStep = useSetAtom(stepAtom);
  const setCompanyName = useSetAtom(companyNameAtom);
  const setProductName = useSetAtom(productNameAtom);
  const setFeature1Title = useSetAtom(feature1TitleAtom);
  const setFeature1Desc = useSetAtom(feature1DescAtom);
  const setFeature2Title = useSetAtom(feature2TitleAtom);
  const setFeature2Desc = useSetAtom(feature2DescAtom);
  const setFeature3Title = useSetAtom(feature3TitleAtom);
  const setFeature3Desc = useSetAtom(feature3DescAtom);
  const setProducerInfo = useSetAtom(producerInfoAtom);
  const setMotivation = useSetAtom(motivationAtom);
  const setSecret = useSetAtom(secretAtom);
  const setExample1 = useSetAtom(example1Atom);
  const setExample2 = useSetAtom(example2Atom);
  const setExample3 = useSetAtom(example3Atom);
  const setCategory = useSetAtom(categoryAtom);
  const setSpec = useSetAtom(specAtom);
  const setDelivery = useSetAtom(deliveryAtom);
  const setTranscribedTextPart1 = useSetAtom(transcribedTextPart1Atom);
  const setTranscribedTextPart2 = useSetAtom(transcribedTextPart2Atom);
  const setTranscribedTextPart3 = useSetAtom(transcribedTextPart3Atom);
  const setProductDetailImages = useSetAtom(productDetailImagesAtom);
  const setProductionSiteImages = useSetAtom(productionSiteImagesAtom);
  const setSellerImages = useSetAtom(sellerImagesAtom);
  const setProductUsageImages = useSetAtom(productUsageImagesAtom);
  const setCustomUserText = useSetAtom(customUserTextAtom);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const resetAllAtoms = () => {
    // 모든 atom을 초기값으로 리셋
    setStep(1);
    setCompanyName("");
    setProductName("");
    setFeature1Title("");
    setFeature1Desc("");
    setFeature2Title("");
    setFeature2Desc("");
    setFeature3Title("");
    setFeature3Desc("");
    setProducerInfo("");
    setMotivation("");
    setSecret("");
    setExample1("");
    setExample2("");
    setExample3("");
    setCategory("");
    setSpec("");
    setDelivery("");
    setTranscribedTextPart1("");
    setTranscribedTextPart2("");
    setTranscribedTextPart3("");
    setProductDetailImages([]);
    setProductionSiteImages([]);
    setSellerImages([]);
    setProductUsageImages([]);
    setCustomUserText("");
  };

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

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // DTO에 맞게 데이터 구성
    const requestData = {
      description: transcribedTextPart1,
      describe: transcribedTextPart1,
      company: companyName,
      productName: productName,
      productKeyword1: feature1Title,
      productKeywordDescription1: feature1Desc,
      productKeyword2: feature2Title,
      productKeywordDescription2: feature2Desc,
      productKeyword3: feature3Title,
      productKeywordDescription3: feature3Desc,
      introduction: producerInfo,
      story: motivation,
      storyDescription: secret,
      productIntroduction: transcribedTextPart3,
      productguide1: example1,
      productguide2: example2,
      productguide3: example3,
      category: category,
      productSpecification: spec,
      productDeliverInfo: delivery,
      email: email,
      userName: name,
      productDetailImages: productDetailImages,
      productionSiteImages: productionSiteImages,
      sellerImages: sellerImages,
      productUsageImages: productUsageImages,
      customUserText: customUserText,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DURUMO_BACKEND_BASE}/openai/hansuwon`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        },
      );

      if (!response.ok) {
        throw new Error("제출에 실패했습니다.");
      }

      // 제출 성공 시 모든 atom 초기화
      resetAllAtoms();

      router.push("/submission-complete");
    } catch (error) {
      console.error("제출 오류:", error);
      toast.error("제출에 실패했습니다. 다시 시도해주세요.");
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex h-[calc(100vh-20px)] flex-col">
      <AppBar
        title="Step3. 디자인 완성"
        type={AppBarType.back}
        onClose={isSubmitting ? undefined : () => router.back()}
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
            disabled={isSubmitting}
          />
          <Input
            ref={emailRef}
            title=""
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="이메일 주소를 입력해 주세요"
            type="email"
            disabled={isSubmitting}
          />
        </div>

        {/* 하단 입력하기 버튼 */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`h-14 w-full rounded-full font-bold text-white transition-all ${
              isSubmitting ? "cursor-not-allowed bg-[#B0B8C1]" : "bg-[#0A80ED]"
            }`}
          >
            {isSubmitting ? "제출 중..." : "입력하기"}
          </button>
        </div>
      </main>
    </div>
  );
}
