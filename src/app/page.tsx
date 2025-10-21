import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className="flex w-full flex-col items-center">
        <div className="h-16" />
        <h1 className="text-2xl leading-snug font-bold text-[#121417]">
          상품 상세페이지 만들기
        </h1>
        <div className="h-44" />
        <p className="text-xl leading-tight">어떻게 시작할까요?</p>
        <div className="h-28" />
        <Link
          href="/voice-input"
          className="flex h-12 w-48 items-center justify-center rounded-full bg-[#0A80ED]"
        >
          <span className="leading-normal font-bold text-white">녹음하기</span>
        </Link>
        <div className="h-3" />
        <Link
          href="/text-input"
          className="flex h-12 w-48 items-center justify-center rounded-full bg-[#F2F2F5]"
        >
          <span className="leading-normal font-bold text-[#121417]">
            글쓰기
          </span>
        </Link>
      </main>
    </div>
  );
}
