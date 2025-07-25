import * as React from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import type { BaseCheckboxProps } from "./types";

const BaseCheckbox = React.forwardRef<HTMLButtonElement, BaseCheckboxProps>(
  ({ checked, onChange, label, error, required, className, id }, ref) => (
    <div className={"flex items-center gap-2 " + (className || "") }>
      <Checkbox
        ref={ref}
        checked={checked}
        onCheckedChange={onChange}
        id={id}
      />
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  )
);
BaseCheckbox.displayName = "BaseCheckbox";

export default BaseCheckbox; 