import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import type { BaseSelectProps } from "./types";

export interface BaseSelectOption {
  value: string;
  label: string;
}

const BaseSelect = React.forwardRef<HTMLButtonElement, BaseSelectProps>(
  (
    {
      value,
      onChange,
      options,
      placeholder,
      label,
      error,
      required,
      className,
      clearable,
      id,
    },
    ref
  ) => (
    <div className={"flex flex-col gap-1 w-full " + (className || "")}>
      {label && (
        <label className="text-sm font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative w-full">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger
            ref={ref}
            id={id}
            className={
              "w-full border border-[#C9C9C9] pr-6 [&>svg]:hidden" +
              (error
                ? " border-red-500 hover:border-red-500 focus:border-red-500"
                : "")
            }
          >
            <SelectValue placeholder={placeholder || "กรุณาเลือก"} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* ปุ่ม Clear หรือ Dropdown Icon */}
        {clearable && value ? (
          <button
            type="button"
            aria-label="Clear selection"
            className="absolute right-2 cursor-pointer top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 z-20 bg-white p-0.5 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              if (onChange) onChange("");
            }}
            tabIndex={0}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4L12 12M12 4L4 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        ) : (
          // แสดงไอคอน dropdown ถ้ายังไม่ได้เลือกค่า
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
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
    </div>
  )
);
BaseSelect.displayName = "BaseSelect";

export default BaseSelect;
