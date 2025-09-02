"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  type?: 'default' | 'success' | 'warning' | 'error';
  onClose: () => void;
}

export function Toast({ id, title, description, type = 'default', onClose }: ToastProps) {
  const typeStyles = {
    default: "bg-white border-gray-200",
    success: "bg-green-50 border-green-200",
    warning: "bg-orange-50 border-orange-200", 
    error: "bg-red-50 border-red-200",
  };

  const textStyles = {
    default: "text-gray-900",
    success: "text-green-900",
    warning: "text-orange-900",
    error: "text-red-900",
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={cn(
        "pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border shadow-lg",
        typeStyles[type]
      )}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-1">
            {title && (
              <p className={cn("text-sm font-medium", textStyles[type])}>
                {title}
              </p>
            )}
            {description && (
              <p className={cn("mt-1 text-sm", textStyles[type])}>
                {description}
              </p>
            )}
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              className={cn(
                "inline-flex rounded-md p-1.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500",
                textStyles[type]
              )}
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Array<{
    id: string;
    title?: string;
    description?: string;
    type?: 'default' | 'success' | 'warning' | 'error';
  }>;
  onRemoveToast: (id: string) => void;
}

export function ToastContainer({ toasts, onRemoveToast }: ToastContainerProps) {
  return (
    <div className="pointer-events-none fixed top-0 right-0 z-50 flex max-h-screen w-full flex-col-reverse p-4 sm:top-4 sm:max-w-sm">
      {toasts.map((toast) => (
        <div key={toast.id} className="mb-2">
          <Toast
            id={toast.id}
            title={toast.title}
            description={toast.description}
            type={toast.type}
            onClose={() => onRemoveToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}