"use client"

import { cn } from "@/lib/utils"

interface NavItemProps {
  label: string
  isActive?: boolean
  onClick?: () => void
  className?: string
  disabled?: boolean
}

/**
 * NavItem - Horizontal navigation tab component
 * 
 * Creates a clean tab navigation item with orange active state
 * matching the design from box-dashboard project
 */
export function NavItem({
  label,
  isActive = false,
  onClick,
  className = "",
  disabled = false
}: NavItemProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        // Base styles
        "relative px-4 py-3 text-sm font-medium transition-colors duration-200",
        "border-b-2 border-transparent",
        "hover:text-gray-900 focus:outline-none focus:text-gray-900",
        
        // Active state with orange theme
        isActive && [
          "text-orange-600 border-b-orange-500",
          "hover:text-orange-600"
        ],
        
        // Inactive state
        !isActive && [
          "text-gray-500",
          "hover:text-gray-700"
        ],
        
        // Disabled state
        disabled && [
          "opacity-50 cursor-not-allowed",
          "hover:text-gray-500"
        ],
        
        className
      )}
      type="button"
    >
      {label}
    </button>
  )
}

interface NavTabsProps {
  items: Array<{
    id: string
    label: string
    disabled?: boolean
  }>
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

/**
 * NavTabs - Container for horizontal navigation tabs
 * 
 * Manages a collection of NavItem components with consistent styling
 */
export function NavTabs({
  items,
  activeTab,
  onTabChange,
  className = ""
}: NavTabsProps) {
  return (
    <div className={cn("border-b border-gray-200", className)}>
      <nav className="-mb-px flex" aria-label="Tabs">
        {items.map((item) => (
          <NavItem
            key={item.id}
            label={item.label}
            isActive={activeTab === item.id}
            onClick={() => !item.disabled && onTabChange(item.id)}
            disabled={item.disabled}
          />
        ))}
      </nav>
    </div>
  )
}

// Export types for convenience
export type { NavItemProps, NavTabsProps }