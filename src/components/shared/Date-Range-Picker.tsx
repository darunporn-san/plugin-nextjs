import * as React from "react";
import { Controller, Control } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateRangePickerProps {
  name: string;
  control: Control<any>;
  label?: string;
  tooltip?: string;
  required?: boolean;
  className?: string;
}

export function DateRangePicker({ name, control, label, tooltip, required = false, className }: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message || (fieldState.invalid && "This field is required");
        const display =
          field.value && field.value.from && field.value.to
            ? `${format(field.value.from, "dd/MM/yyyy")} - ${format(field.value.to, "dd/MM/yyyy")}`
            : "เลือกช่วงวันที่";
        return (
          <div className={"flex flex-col gap-1 w-full " + (className || "")}>
            {/* Always maintain consistent label area height */}
            <div className="h-5 flex items-center gap-1">
              {label && (
                <label className="text-sm font-medium" htmlFor={name}>
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
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <div className="w-full">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-between font-normal border-[#C9C9C9] border rounded-md h-9 text-base px-3"
                    >
                      <span>{display}</span>
                      <CalendarIcon className="text-blue-600 w-7 h-7" />
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                    captionLayout="dropdown"
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
        );
      }}
    />
  );
}