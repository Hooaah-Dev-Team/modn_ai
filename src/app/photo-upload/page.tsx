"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppBar, AppBarType } from "@/components/AppBar";

interface PhotoSection {
  id: string;
  title: string;
  description: string;
  count: string;
  photos: File[];
}

const photoSections: PhotoSection[] = [
  {
    id: "product-detail",
    title: "상품 상세 사진",
    description: "전체, 상세, 포장된 모습 등 약 7장",
    count: "약 7장",
    photos: [],
  },
  {
    id: "production-site",
    title: "생산 현장 사진",
    description: "",
    count: "약 5장",
    photos: [],
  },
  {
    id: "seller",
    title: "판매자 사진",
    description: "",
    count: "약 3장",
    photos: [],
  },
  {
    id: "usage",
    title: "상품 사용 사진",
    description: "요리, 사용 모습 등",
    count: "약 3장",
    photos: [],
  },
];

export default function PhotoUploadPage() {
  const router = useRouter();
  const [sections, setSections] = useState<PhotoSection[]>(photoSections);

  const handleFileUpload = (sectionId: string, files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, photos: [...section.photos, ...newFiles] }
          : section,
      ),
    );
  };

  const removePhoto = (sectionId: string, photoIndex: number) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              photos: section.photos.filter((_, index) => index !== photoIndex),
            }
          : section,
      ),
    );
  };

  const handleNext = () => {
    // TODO: 다음 단계로 이동
    router.push("/template-select");
  };

  const renderPhotoSection = (section: PhotoSection) => (
    <div key={section.id} className="mb-6">
      {/* 섹션 제목 */}
      <div className="mb-3">
        <h3 className="text-base font-bold text-[#121417]">{section.title}</h3>
        <p className="text-sm text-[#6B7684]">
          ({section.description && <span>{section.description} </span>}
          {section.count})
        </p>
      </div>

      {/* 업로드 영역 */}
      <div className="rounded-lg border-2 border-dashed border-[#DBE0E5] p-6">
        {section.photos.length === 0 ? (
          <div className="text-center">
            <p className="mb-2 text-sm text-[#6B7684]">No image uploaded yet</p>
            <p className="mb-4 text-xs text-[#9CA3AF]">
              Recommended size: 1:1 or 4:5 ratio
            </p>
            <label className="inline-block">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileUpload(section.id, e.target.files)}
                className="hidden"
              />
              <div className="cursor-pointer rounded-full bg-[#0A80ED] px-4 py-2 text-sm font-medium text-white">
                사진 올리기
              </div>
            </label>
          </div>
        ) : (
          <div>
            {/* 업로드된 사진들 - 3열 그리드 */}
            <div className="mb-4 grid grid-cols-3 gap-2">
              {/* 업로드된 사진들 */}
              {section.photos.map((photo, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Uploaded ${index + 1}`}
                    className="h-full w-full rounded-lg object-cover"
                  />
                  <button
                    onClick={() => removePhoto(section.id, index)}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* + 버튼 - 사진이 있을 때 하나만 표시 */}
              {section.photos.length > 0 && (
                <label className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-[#DBE0E5] bg-[#F9FAFB]">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) =>
                      handleFileUpload(section.id, e.target.files)
                    }
                    className="hidden"
                  />
                  <div className="text-xl text-[#9CA3AF]">+</div>
                </label>
              )}
            </div>

            {/* 사진 추가하기 버튼 */}
            {section.photos.length > 0 && (
              <div className="text-center">
                <label className="inline-block">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) =>
                      handleFileUpload(section.id, e.target.files)
                    }
                    className="hidden"
                  />
                  <div className="cursor-pointer rounded-full bg-[#0A80ED] px-4 py-2 text-sm font-medium text-white">
                    사진 추가하기
                  </div>
                </label>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-20px)] flex-col">
      <AppBar
        title="사진 선택"
        type={AppBarType.back}
        onClose={() => router.back()}
      />

      <main className="flex flex-1 flex-col px-4 pb-4">
        {/* 진행 표시 */}
        <div className="mx-auto flex gap-3 py-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === 4 ? "bg-[#121417]" : "bg-[#DBE0E5]"
              }`}
            />
          ))}
        </div>

        {/* 메인 제목 */}
        <h1 className="mb-6 text-2xl font-bold text-[#121417]">
          사진을 업로드해 주세요
        </h1>

        {/* 사진 업로드 섹션들 */}
        <div className="flex-1">{sections.map(renderPhotoSection)}</div>

        {/* 하단 다음 버튼 */}
        <div className="mt-6">
          <button
            onClick={handleNext}
            className="h-14 w-full rounded-full bg-[#0A80ED] font-bold text-white"
          >
            다음
          </button>
        </div>
      </main>
    </div>
  );
}
