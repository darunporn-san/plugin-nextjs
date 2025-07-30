import * as React from "react";
import { Input } from "../ui/input";
import { HelpCircle } from "lucide-react";
import type { BaseInputFileProps } from "./types";
import { validateExcelFileWithHeaders } from "@/lib/excelValidator";

interface ExcelValidationProps {
  expectedHeaders?: string[];
  onValidation?: (result: any) => void;
}

const BaseInputFile = React.forwardRef<HTMLInputElement, BaseInputFileProps & ExcelValidationProps>(
  (
    {
      label,
      tooltip,
      error,
      required,
      id,
      placeholder,
      disabled,
      accept = ".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel",
      expectedHeaders,
      onValidation,
      onChange,
      ...props
    },
    ref
  ) => {
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      
      if (file && expectedHeaders && onValidation) {
        try {
          // Use actual Excel validation with xlsx library
          const validationResult = await validateExcelFileWithHeaders(file, expectedHeaders);
          onValidation(validationResult);
        } catch (error) {
          onValidation({
            isValid: false,
            error: `เกิดข้อผิดพลาดในการตรวจสอบไฟล์: ${error instanceof Error ? error.message : 'Unknown error'}`
          });
        }
      }

      // Call original onChange if provided
      if (onChange) {
        onChange(event);
      }
    };

    return (
      <div className="flex flex-col gap-1 w-full relative">
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

        {/* file input with required * beside it */}
        <div className="flex items-center gap-1 relative">
          <Input
            ref={ref}
            aria-invalid={!!error}
            id={id}
            type="file"
            placeholder={placeholder || "เลือกไฟล์ Excel"}
            disabled={disabled}
            accept={accept}
            onChange={handleFileChange}
            {...props}
            className="w-full"
          />
          {required && <span className="text-red-500 text-sm">*</span>}
        </div>

        {/* error message */}
        {error && (
          <div className="text-xs text-red-500 mt-1">
            {error}
          </div>
        )}
      </div>
    );
  }
);

BaseInputFile.displayName = "BaseInputFile";
export default BaseInputFile; 