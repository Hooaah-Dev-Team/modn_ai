"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppBar, AppBarType } from "@/components/AppBar";

import BasicIcon from "@/assets/icons/basic.png";
import EmotionalIcon from "@/assets/icons/emotional.png";
import VisualIcon from "@/assets/icons/visual.png";

const templates = [
  {
    id: "basic-info",
    title: "상품 정보 한눈에 보기",
    subtitle: "Basic Info First",
    description: "제품 사진과 이름, 기본 정보를 한눈에 보여주는 구성",
    icon: BasicIcon,
  },
  {
    id: "emotional-story",
    title: "감성 스토리 중심",
    subtitle: "Emotional Storytelling",
    description: "브랜드 이미지와 감성 이미지로 따뜻하게 전하는 상품 소개",
    icon: EmotionalIcon,
  },
  {
    id: "visual-showcase",
    title: "비주얼 중심",
    subtitle: "Visual Showcase",
    description: "고해상도 이미지 중심, 텍스트 최소화로 시각적 임팩트를 강조",
    icon: VisualIcon,
  },
];

export default function TemplateSelectPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedTemplate) {
      // TODO: 선택된 템플릿을 다음 페이지로 전달하고 로딩 표시
      router.push("/loading-design");
    }
  };

  return (
    <div className="flex h-[calc(100vh-20px)] flex-col">
      <AppBar
        title="Step3. 템플릿 고르기"
        type={AppBarType.back}
        onClose={() => router.back()}
      />

      <main className="flex flex-1 flex-col px-4 pb-4">
        {/* 안내 문구 */}
        <h1 className="mt-6 mb-6 text-xl font-medium text-[#121417]">
          아래 중 원하는 스타일을 선택해 주세요!
        </h1>

        {/* 템플릿 옵션들 */}
        <div className="flex-1 space-y-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
                selectedTemplate === template.id
                  ? "border-[#0A80ED] bg-blue-50"
                  : "border-[#E5E8EB] bg-white"
              }`}
            >
              {/* 목업 이미지 - 텍스트 위에 크게 */}
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                <Image
                  src={template.icon}
                  alt={template.title}
                  fill
                  className="object-cover"
                  quality={100}
                  priority
                />
              </div>

              {/* 템플릿 제목 */}
              <div className="mb-2">
                <h3 className="text-lg font-bold text-[#121417]">
                  {template.title}
                </h3>
                <p className="text-sm text-[#6B7684]">{template.subtitle}</p>
              </div>

              {/* 설명 */}
              <p className="text-sm text-[#6B7684]">{template.description}</p>
            </button>
          ))}
        </div>

        {/* 하단 다음 버튼 */}
        <div className="mt-6">
          <button
            onClick={handleNext}
            disabled={!selectedTemplate}
            className={`h-14 w-full rounded-full font-bold transition-all ${
              selectedTemplate
                ? "bg-[#0A80ED] text-white"
                : "cursor-not-allowed bg-[#E5E8EB] text-[#B0B8C1]"
            }`}
          >
            다음
          </button>
        </div>
      </main>
    </div>
  );
}
