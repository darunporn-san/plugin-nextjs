import * as React from "react";
import { Controller, } from "react-hook-form";
import BaseInput from "./BaseInput";
import BaseSelect from "./BaseSelect";
import BaseCheckbox from "./BaseCheckbox";
import type { FormInputProps } from "./types";

const FormInput: React.FC<FormInputProps> = ({
  type = "text",
  name,
  control,
  label,
  tooltip,
  placeholder,
  options = [],
  value,
  maxlength,
  required = false,
  className,
  clearable,
  id,
  disabled,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message || (fieldState.invalid && "This field is required");
        const inputId = id || (type === "checkbox" && value !== undefined ? `${name}-${value}` : name);
        if (type === "select") {
          return (
            <BaseSelect
              value={field.value || value || ""}
              onChange={field.onChange}
              options={options}
              placeholder={placeholder}
              label={label}
              tooltip={tooltip}
              error={error ? error : undefined}
              required={required}
              className={className}
              clearable={clearable}
              id={inputId}
              disabled={disabled}
            />
          );
        }
        if (type === "checkbox") {
          if (value !== undefined) {
            const checked = Array.isArray(field.value) && field.value.includes(value);
            return (
              <BaseCheckbox
                checked={checked}
                onChange={checked => {
                  let newArr = Array.isArray(field.value) ? [...field.value] : [];
                  if (checked) {
                    if (!newArr.includes(value)) newArr.push(value);
                  } else {
                    newArr = newArr.filter(v => v !== value);
                  }
                  field.onChange(newArr);
                }}
                label={label || placeholder}
                error={error ? error : undefined}
                required={required}
                className={className}
                id={inputId}
              />
            );
          }
          return (
            <BaseCheckbox
              checked={!!field.value}
              onChange={checked => field.onChange(!!checked)}
              label={label || placeholder}
              error={error ? error : undefined}
              required={required}
              className={className}
              id={inputId}
            />
          );
        }
        return (
          <BaseInput
            type={type}
            placeholder={placeholder}
            label={label}
            tooltip={tooltip}
            error={error ? error : undefined}
            required={required}
            className={className}
            maxLength={maxlength}
            disabled={disabled}
            {...field}
            id={inputId}
            onKeyDown={type === "number"
              ? (e: React.KeyboardEvent<HTMLInputElement>) => {
                  if ([
                    "Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete", "Escape", "Enter"
                  ].includes(e.key)) {
                    return;
                  }
                  if ((e.ctrlKey || e.metaKey) && ["a", "c", "v", "x"].includes(e.key.toLowerCase())) {
                    return;
                  }
                  if (!/^[0-9.]$/.test(e.key)) {
                    e.preventDefault();
                  }
                }
              : undefined}
          />
        );
      }}
    />
  );
};

export default FormInput; 