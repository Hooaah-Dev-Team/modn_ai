import { forwardRef, useId, useImperativeHandle, useRef } from "react";

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  title: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: { height: "calc(3rem-4px)", maxHeight: "calc(12rem)" },
  md: { height: "calc(4.5rem-4px)", maxHeight: "calc(15rem)" },
  lg: { height: "calc(9rem-4px)", maxHeight: "calc(20rem)" },
  xl: { height: "calc(20rem-4px)", maxHeight: "calc(30rem)" },
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ title, size = "sm", ...rest }, forwardedRef) => {
    const id = useId();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(forwardedRef, () => textareaRef.current!);

    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={id}
          className="leading-normal font-medium text-[#121417]"
        >
          {title}
        </label>
        <textarea
          ref={textareaRef}
          id={id}
          className="resize-none overflow-y-auto rounded-lg border-2 border-[#DBE0E5] bg-white p-2 text-base leading-normal outline-none focus:border-[#121417]"
          style={{
            height: sizeClasses[size].height,
            maxHeight: sizeClasses[size].maxHeight,
          }}
          {...rest}
        />
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
