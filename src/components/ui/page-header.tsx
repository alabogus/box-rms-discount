"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
  children?: ReactNode
}

/**
 * PageHeader - Reusable page header component
 * 
 * Provides consistent page header layout with title, description, and optional action buttons.
 * Actions (like buttons) can be passed as children and will be positioned on the right side.
 */
export function PageHeader({
  title,
  description,
  className = "",
  children
}: PageHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {title}
        </h1>
        {description && (
          <p className="text-gray-600 mt-1">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-3">
          {children}
        </div>
      )}
    </div>
  )
}

export type { PageHeaderProps }