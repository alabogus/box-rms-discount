"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { patterns } from "@/lib/design-system";

interface FormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  onSubmit?: () => void;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  submitDisabled?: boolean;
  className?: string;
}

export function FormSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  isSubmitting = false,
  submitDisabled = false,
  className,
}: FormSheetProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className={cn(patterns.form.sheet, className)}
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 flex-shrink-0">
            <SheetHeader className="pl-0 text-left">
              <SheetTitle className="text-xl font-semibold text-gray-900">
                {title}
              </SheetTitle>
              {description && (
                <SheetDescription className="text-gray-600">
                  {description}
                </SheetDescription>
              )}
            </SheetHeader>
            
            <Separator className="my-6" />
          </div>

          {/* Scrollable Form Content */}
          <div className="flex-1 overflow-y-auto px-6">
            <div className="space-y-6">
              {children}
            </div>
          </div>

          {/* Fixed Footer Actions */}
          <div className={cn(patterns.form.actions, "flex-shrink-0 border-t bg-white")}>
            <Button 
              type="button"
              variant="outline" 
              className="flex-1"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              {cancelLabel}
            </Button>
            <Button 
              type="submit"
              className="text-white flex-1" 
              style={patterns.button.primaryStyle}
              disabled={submitDisabled || isSubmitting}
            >
              {isSubmitting ? "Saving..." : submitLabel}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}