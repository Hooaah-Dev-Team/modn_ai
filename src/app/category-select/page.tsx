"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import DrinkIcon from "@/assets/icons/drink.png";
import LifeIcon from "@/assets/icons/life.png";
import ProduceIcon from "@/assets/icons/produce.png";
import RetortIcon from "@/assets/icons/retort.png";
import { AppBar, AppBarType } from "@/components/AppBar";

const categories = [
  {
    id: "농수산물",
    title: "농수산물",
    description: "신선 야채, 곡물, 수산, 축산 등의 원재료",
    icon: ProduceIcon,
  },
  {
    id: "가공식품",
    title: "가공식품",
    description: "밀키트, 소스, 간식 등",
    icon: RetortIcon,
  },
  {
    id: "음료/주류",
    title: "음료/주류",
    description: "주스, 와인, 맥주, 차 등",
    icon: DrinkIcon,
  },
  {
    id: "생활용품/공산품",
    title: "생활용품/공산품",
    description: "수공예, 생활용품 등",
    icon: LifeIcon,
  },
];

export default function CategorySelectPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedCategory) {
      // TODO: 선택된 카테고리를 다음 페이지로 전달
      router.push("/photo-upload");
    }
  };

  return (
    <div className="flex h-[calc(100vh-20px)] flex-col">
      <AppBar
        title="상품 카테고리 선택하기"
        type={AppBarType.back}
        onClose={() => router.back()}
      />
      <main className="flex flex-1 flex-col px-4 pb-4">
        <h1 className="mt-6 mb-6 text-xl leading-normal font-medium text-[#121417]">
          다음 중 하나의 카테고리를 택해주세요
        </h1>

        {/* 카테고리 그리드 */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex flex-col items-start rounded-2xl border-2 p-4 transition-all ${
                selectedCategory === category.id
                  ? "border-[#0A80ED] bg-blue-50"
                  : "border-[#E5E8EB] bg-white"
              }`}
            >
              {/* 아이콘 이미지 */}
              <div className="mb-3 h-12 w-12">
                <Image
                  src={category.icon}
                  alt={category.title}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>

              {/* 카테고리 제목 */}
              <h3 className="mb-1 text-base font-bold text-[#121417]">
                {category.title}
              </h3>

              {/* 카테고리 설명 */}
              <p className="text-xs leading-relaxed text-[#6B7684]">
                {category.description}
              </p>
            </button>
          ))}
        </div>

        {/* 하단 다음 버튼 */}
        <div className="mt-auto">
          <button
            onClick={handleNext}
            disabled={!selectedCategory}
            className={`h-14 w-full rounded-full font-bold transition-all ${
              selectedCategory
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
