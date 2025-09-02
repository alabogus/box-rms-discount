"use client";

import { cn, getStatusBadgeClass } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Clock, Info } from "lucide-react";

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

const statusIcons = {
  'Available': CheckCircle,
  'Active': CheckCircle,
  'Low Quantity': AlertTriangle,
  'Warning': AlertTriangle,
  'Out of Stock': XCircle,
  'Inactive': XCircle,
  'Pending': Clock,
  'Draft': Info,
} as const;

export function StatusBadge({ 
  status, 
  variant = 'default',
  size = 'md',
  showIcon = true,
  className 
}: StatusBadgeProps) {
  const statusClass = getStatusBadgeClass(status);
  const Icon = statusIcons[status as keyof typeof statusIcons];
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-sm px-3 py-1',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-3 w-3',
    lg: 'h-4 w-4',
  };

  return (
    <Badge
      variant={variant}
      className={cn(
        statusClass,
        sizeClasses[size],
        "font-medium inline-flex items-center gap-1",
        className
      )}
    >
      {showIcon && Icon && (
        <Icon className={iconSizes[size]} />
      )}
      {status}
    </Badge>
  );
}