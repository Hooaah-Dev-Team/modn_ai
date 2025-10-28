"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import BasicIcon from "@/assets/icons/basic.png";
import EmotionalIcon from "@/assets/icons/emotional.png";
import VisualIcon from "@/assets/icons/visual.png";
import { AppBar, AppBarType } from "@/components/AppBar";

const templates = [
  {
    id: "basic-info",
    title: "원료 중심형",
    subtitle: "Ingredient Story",
    description: "재료 자체의 이야기와 특징을 강조하는 상세페이지",
    icon: BasicIcon,
  },
  {
    id: "emotional-story",
    title: "과정 강조형",
    subtitle: "From Hand to Heart",
    description: "제품을 만드는 과정을 강조하는 상세페이지",
    icon: EmotionalIcon,
  },
  {
    id: "visual-showcase",
    title: "효과 강조형",
    subtitle: "Power in Proof",
    description: "제품의 효과를 강조하는 상세페이지",
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
        <h1 className="mt-6 mb-6 text-center text-xl font-medium text-[#121417]">
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
                  priority
                />
              </div>

              {/* 템플릿 제목 */}
              <div className="mb-2">
                <h3 className="text-lg font-bold text-[#121417]">
                  {template.title}
                </h3>
                <p className="text-sm text-[#6B7684]">{template.description}</p>
              </div>
              <p className="text-sm text-[#6B7684]">{template.subtitle}</p>
              {/* 설명 */}
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
