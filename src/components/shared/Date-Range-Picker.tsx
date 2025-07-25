import * as React from "react";
import { Controller, Control } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateRangePickerProps {
  name: string;
  control: Control<any>;
}

export function DateRangePicker({ name, control }: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const display =
          field.value && field.value.from && field.value.to
            ? `${format(field.value.from, "dd/MM/yyyy")} - ${format(field.value.to, "dd/MM/yyyy")}`
            : "เลือกช่วงวันที่";
        return (
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
        );
      }}
    />
  );
}