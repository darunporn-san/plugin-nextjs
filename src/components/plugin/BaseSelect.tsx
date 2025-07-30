import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { HelpCircle } from "lucide-react";
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
      tooltip,
      error,
      required,
      className,
      clearable,
      id,
      disabled,
    },
    ref
  ) => {
    // Find the selected option to display the correct label
    const selectedOption = React.useMemo(() => {
      return options.find(option => option.value === value)
    }, [options, value])

    return (
      <div className={"flex flex-col gap-1 w-full " + (className || "")}>
        {/* Always maintain consistent label area height */}
        <div className="h-5 flex items-center gap-1">
          {label && (
            <label className="text-sm font-medium" htmlFor={id}>
              {label}
            </label>
          )}
          {tooltip && label && (
            <div className="relative group">
              <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                {tooltip}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            </div>
          )}
        </div>
        <div className="relative w-full">
          <Select value={value} onValueChange={onChange} disabled={disabled}>
            <SelectTrigger
              ref={ref}
              id={id}
              className={
                "w-full border border-[#C9C9C9] pr-6 [&>svg]:hidden" +
                (error
                  ? " border-red-500 hover:border-red-500 focus:border-red-500"
                  : "") +
                (disabled ? " opacity-50 cursor-not-allowed" : "")
              }
            >
              <SelectValue placeholder={placeholder || "กรุณาเลือก"}>
                {selectedOption ? selectedOption.label : placeholder || "กรุณาเลือก"}
              </SelectValue>
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
          {clearable && value && !disabled ? (
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
  }
);
BaseSelect.displayName = "BaseSelect";

export default BaseSelect;
