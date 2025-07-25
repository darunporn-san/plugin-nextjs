import type { Control } from "react-hook-form";
import type { BaseSelectOption } from "./BaseSelect";

export interface FormInputProps {
  type?: "text" | "number" | "password" | "select" | "checkbox";
  name: string;
  control: Control<any>;
  label?: string;
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