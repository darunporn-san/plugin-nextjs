import type { Control } from "react-hook-form";
import type { BaseSelectOption } from "./BaseSelect";

export interface FormInputProps {
  type?: "text" | "number" | "password" | "select" | "checkbox";
  name: string;
  control: Control<any>;
  label?: string;
  tooltip?: string;
  placeholder?: string;
  options?: BaseSelectOption[];
  value?: string; // for checkbox group
  maxlength?: number;
  required?: boolean;
  className?: string;
  clearable?: boolean;
  id?: string;
  disabled?: boolean;
}

export interface BaseInputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  tooltip?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export interface BaseSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options: BaseSelectOption[];
  placeholder?: string;
  label?: string;
  tooltip?: string;
  error?: string;
  required?: boolean;
  className?: string;
  clearable?: boolean;
  id?: string;
  disabled?: boolean;
}

export interface BaseCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
  id?: string;
}

export interface BaseInputFileProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  tooltip?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  accept?: string; // for accepted file types, e.g. '.xlsx,.xls'
} 