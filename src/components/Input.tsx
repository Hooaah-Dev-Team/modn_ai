import { forwardRef, useId } from "react";

interface InputProps {
  title: string;
  size?: "sm" | "md" | "lg" | "xl";
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "email" | "password";
  placeholder?: string;
}

const sizeClasses = {
  sm: "h-[calc(3rem-4px)]",
  md: "h-[calc(4.5rem-4px)]",
  lg: "h-[calc(9rem-4px)]",
  xl: "h-[calc(20rem-4px)]",
};

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    { title, size = "sm", value, onChange, type = "text", placeholder },
    ref,
  ) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={id}
          className="leading-normal font-medium text-[#121417]"
        >
          {title}
        </label>
        {type === "text" || type === "email" || type === "password" ? (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className={`rounded-lg border-2 border-[#DBE0E5] bg-white p-3 text-base leading-normal outline-none focus:border-[#121417] ${sizeClasses[size]}`}
          />
        ) : (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={id}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={`resize-none rounded-lg border-2 border-[#DBE0E5] bg-white p-2 outline-none focus:border-[#121417] ${sizeClasses[size]} text-base leading-normal`}
          />
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
