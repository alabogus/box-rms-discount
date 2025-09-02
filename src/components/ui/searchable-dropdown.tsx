"use client"

import { SearchableSelect, SearchableSelectOption } from "@/components/ui/searchable-select"

interface SearchableDropdownProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  className?: string
  options: SearchableSelectOption[]
  onCreateNew?: () => void
  createNewLabel?: string
  showCreateButton?: boolean
  size?: "sm" | "default"
  disabled?: boolean
  showDescriptions?: boolean
}

/**
 * SearchableDropdown - A convenient wrapper around SearchableSelect
 * 
 * This component provides a cleaner API and can be used as a drop-in replacement
 * for standard select components with enhanced search functionality.
 */
export function SearchableDropdown(props: SearchableDropdownProps) {
  return <SearchableSelect variant="select-like" {...props} />
}

// Export the option type for convenience
export type { SearchableSelectOption as SearchableDropdownOption }