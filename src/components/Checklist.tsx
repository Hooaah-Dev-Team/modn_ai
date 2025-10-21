import Image from "next/image";

import circleIcon from "@/assets/icons/circle.svg";

interface ChecklistProps {
  text: string;
}

export const Checklist = ({ text }: ChecklistProps) => {
  return (
    <div className="my-2 flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2F2F5]">
        <Image src={circleIcon} alt="circle icon" className="h-6 w-6" />
      </div>
      <span className="flex-1 leading-normal whitespace-pre-wrap text-[#121417]">
        {text}
      </span>
    </div>
  );
};
