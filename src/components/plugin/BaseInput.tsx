import * as React from "react";
import { Input } from "../ui/input";
import type { BaseInputProps } from "./types";

const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, error, required, id, placeholder, disabled, ...props }, ref) => (
    <div className="flex flex-col gap-1 w-full relative">
      {label && (
        <label className="text-sm font-medium" htmlFor={id}>
          {label}
        </label>
      )}

      {/* input with full width */}
      <Input
        ref={ref}
        aria-invalid={!!error}
        id={id}
        placeholder={placeholder || "กรุณากรอก"}
        disabled={disabled}
        {...props}
        className="w-full"
      />

      {/* required * outside input, absolute to the right */}
      {required && (
        <span className="absolute right-[-10px] top-[1px] text-red-500">
          *
        </span>
      )}

      {/* error message */}
      {error && (
          <div className="absolute left-0 w-full text-xs text-red-500 mt-1 z-10 top-full">
          {error}
        </div>
      )}
    </div>
  )
);

BaseInput.displayName = "BaseInput";
export default BaseInput;
