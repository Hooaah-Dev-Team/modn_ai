import { forwardRef, useId } from "react";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  title: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-[calc(3rem-4px)]",
  md: "h-[calc(4.5rem-4px)]",
  lg: "h-[calc(9rem-4px)]",
  xl: "h-[calc(20rem-4px)]",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ title, size = "sm", ...rest }, ref) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={id}
          className="leading-normal font-medium text-[#121417]"
        >
          {title}
        </label>
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          id={id}
          className={`rounded-lg border-2 border-[#DBE0E5] bg-white p-3 text-base leading-normal outline-none focus:border-[#121417] ${sizeClasses[size]}`}
          {...rest}
        />
      </div>
    );
  },
);

Input.displayName = "Input";
