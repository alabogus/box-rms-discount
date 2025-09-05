"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { patterns } from "@/lib/design-system";

interface FormFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'number' | 'select' | 'textarea' | 'password';
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  required?: boolean;
  error?: string;
  options?: { value: string; label: string }[];
  className?: string;
  disabled?: boolean;
  rows?: number;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({
    id,
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    required = false,
    error,
    options = [],
    className,
    disabled = false,
    rows = 3,
    ...props
  }, ref) => {
    const renderInput = () => {
      switch (type) {
        case 'select':
          return (
            <Select value={value?.toString()} onValueChange={onChange} disabled={disabled}>
              <SelectTrigger className={cn(patterns.input, error && "border-red-500")}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        
        case 'textarea':
          return (
            <Textarea
              id={id}
              placeholder={placeholder}
              value={value?.toString() || ''}
              onChange={(e) => onChange?.(e.target.value)}
              disabled={disabled}
              rows={rows}
              className={cn(
                patterns.input,
                error && "border-red-500",
                "min-h-[80px]"
              )}
              {...props}
            />
          );
        
        default:
          return (
            <Input
              ref={ref}
              id={id}
              type={type}
              placeholder={placeholder}
              value={value?.toString() || ''}
              onChange={(e) => onChange?.(e.target.value)}
              required={required}
              disabled={disabled}
              className={cn(
                patterns.input,
                error && "border-red-500"
              )}
              {...props}
            />
          );
      }
    };

    return (
      <div className={cn(patterns.form.field, className)}>
        <Label 
          htmlFor={id} 
          className={cn(
            "text-sm font-medium",
            error && "text-red-600"
          )}
        >
          {label}
          {required && <span className="text-muted-foreground ml-1">*</span>}
        </Label>
        {renderInput()}
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";