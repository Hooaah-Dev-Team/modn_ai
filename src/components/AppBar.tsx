"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import ArrowBack from "@/assets/icons/arrow-back.svg";
import Close from "@/assets/icons/close.svg";

export enum AppBarType {
  back,
  close,
}

interface AppBarProps {
  title: string;
  type?: AppBarType;
  onClose?: () => void;
}

export const AppBar = ({
  title,
  type = AppBarType.back,
  onClose,
}: AppBarProps) => {
  const router = useRouter();

  return (
    <header className="flex w-full items-center justify-between px-2 pt-4 pb-2">
      <button
        className="flex cursor-pointer items-center justify-center p-2"
        onClick={() => (onClose ? onClose() : router.back())}
      >
        <Image
          src={type === AppBarType.back ? ArrowBack : Close}
          alt={type === AppBarType.back ? "Back" : "Close"}
        />
      </button>
      <span className="text-center text-lg leading-normal font-bold text-[#121417]">
        {title}
      </span>
      <div className="h-12 w-10" />
    </header>
  );
};
