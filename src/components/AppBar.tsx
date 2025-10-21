"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import ArrowBack from "../../public/arrow-back.svg";
import Close from "../../public/close.svg";

export enum AppBarType {
  back,
  close,
}

interface AppBarProps {
  title: string;
  type?: AppBarType;
}

export const AppBar = ({ title, type = AppBarType.back }: AppBarProps) => {
  const router = useRouter();

  return (
    <header className="flex w-full items-center justify-between px-4 pt-4 pb-2">
      <button
        className="flex h-12 w-6 cursor-pointer items-center justify-center"
        onClick={() => router.back()}
      >
        <Image
          src={type === AppBarType.back ? ArrowBack : Close}
          alt={type === AppBarType.back ? "Back" : "Close"}
        />
      </button>
      <span className="text-lg leading-normal font-bold text-[#121417]">
        {title}
      </span>
      <div className="h-12 w-6" />
    </header>
  );
};
