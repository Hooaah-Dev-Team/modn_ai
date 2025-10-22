import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
} from "react";

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  title: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "min-h-[calc(3rem-4px)] max-h-[12rem]",
  md: "min-h-[calc(4.5rem-4px)] max-h-[15rem]",
  lg: "min-h-[calc(9rem-4px)] max-h-[20rem]",
  xl: "min-h-[calc(20rem-4px)] max-h-[30rem]",
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ title, size = "sm", ...rest }, ref) => {
    const id = useId();
    const innerRef = useRef<HTMLTextAreaElement>(null);

    // forwardRef와 내부 ref를 모두 사용하기 위해 useImperativeHandle 사용
    useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement);

    const adjustHeight = () => {
      const textarea = innerRef.current;
      if (textarea) {
        // 높이를 초기화하여 scrollHeight를 정확히 계산
        textarea.style.height = "auto";
        // scrollHeight에 맞춰 높이 조절 (max-height는 CSS로 제한됨)
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    useEffect(() => {
      // 초기 렌더링 시 높이 조절
      adjustHeight();
    }, []);

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      adjustHeight();
      // 기존 onInput 핸들러가 있다면 호출
      if (rest.onInput) {
        rest.onInput(e);
      }
    };

    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={id}
          className="leading-normal font-medium text-[#121417]"
        >
          {title}
        </label>
        <textarea
          ref={innerRef}
          id={id}
          className={`resize-none rounded-lg border-2 border-[#DBE0E5] bg-white p-2 outline-none focus:border-[#121417] ${sizeClasses[size]} overflow-y-auto text-base leading-normal`}
          onInput={handleInput}
          {...rest}
        />
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
