"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon, Plus, CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// Global state to track which dropdown is open
let openDropdownId: string | null = null
const dropdownCallbacks = new Map<string, () => void>()

interface SearchableSelectOption {
  id: number | string
  label: string
  description?: string
}

interface SearchableSelectProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  className?: string
  options: SearchableSelectOption[]
  onCreateNew?: () => void
  createNewLabel?: string
  showCreateButton?: boolean
  variant?: "default" | "select-like"
  showDescriptions?: boolean
  size?: "sm" | "default"
  disabled?: boolean
}

export function SearchableSelect({ 
  value, 
  onChange, 
  placeholder = "Select option", 
  required = false,
  className = "",
  options = [],
  onCreateNew,
  createNewLabel = "Create new option",
  showCreateButton = false,
  variant = "select-like",
  showDescriptions = true,
  size = "default",
  disabled = false
}: SearchableSelectProps) {
  const [searchText, setSearchText] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dropdownId = useRef(`searchable-dropdown-${Math.random().toString(36).substr(2, 9)}`)

  // Filter options based on search
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchText.toLowerCase()) ||
    (option.description && option.description.toLowerCase().includes(searchText.toLowerCase()))
  )

  // Function to close this dropdown
  const closeDropdown = () => {
    setIsDropdownOpen(false)
    if (openDropdownId === dropdownId.current) {
      openDropdownId = null
    }
  }

  // Function to open this dropdown
  const openDropdown = () => {
    if (disabled) return
    
    // Close any other open dropdown
    if (openDropdownId && openDropdownId !== dropdownId.current) {
      const closeCallback = dropdownCallbacks.get(openDropdownId)
      if (closeCallback) {
        closeCallback()
      }
    }
    
    setIsDropdownOpen(true)
    openDropdownId = dropdownId.current
  }

  // Register this dropdown's close callback
  useEffect(() => {
    dropdownCallbacks.set(dropdownId.current, closeDropdown)
    return () => {
      dropdownCallbacks.delete(dropdownId.current)
    }
  }, [])

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!dropdownRef.current?.contains(target)) {
        closeDropdown()
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  // Reset focused index when dropdown opens or search changes
  useEffect(() => {
    setFocusedIndex(0)
  }, [isDropdownOpen, searchText])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isDropdownOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (filteredOptions.length > 0) {
          const selectedOption = filteredOptions[focusedIndex]
          onChange(selectedOption.label)
          setSearchText("")
          closeDropdown()
        }
        break
      case 'Escape':
        closeDropdown()
        break
    }
  }

  return (
    <div ref={dropdownRef} className={cn("relative select-dropdown", className)}>
      <div className="relative">
        <Input
          placeholder={placeholder}
          value={isDropdownOpen ? searchText : (value || "")}
          onChange={(e) => {
            setSearchText(e.target.value)
            if (!isDropdownOpen) openDropdown()
          }}
          onFocus={() => {
            setSearchText("")
            openDropdown()
          }}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full pr-9",
            variant === "select-like" && "border-input data-[placeholder]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
            size === "sm" && "h-8",
            size === "default" && "h-9"
          )}
          required={required}
          disabled={disabled}
        />
        <div className={cn(
          "absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none transition-transform",
          isDropdownOpen && "rotate-180"
        )}>
          <ChevronDownIcon className="h-4 w-4 opacity-50" />
        </div>
      </div>
      
      {isDropdownOpen && (
        <div className={cn(
          "absolute top-full left-0 right-0 mt-1 z-50",
          variant === "select-like" 
            ? "bg-popover text-popover-foreground rounded-md border shadow-md" 
            : "bg-white border border-gray-300 rounded-md shadow-lg"
        )}>
          {/* Options List - Max height for scrolling */}
          <div className="max-h-[200px] overflow-y-auto p-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-400 [&::-webkit-scrollbar-button]:hidden">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    onChange(option.label)
                    setSearchText("")
                    closeDropdown()
                  }}
                  className={cn(
                    "w-full text-left focus:outline-none flex items-center justify-between transition-colors",
                    variant === "select-like"
                      ? cn(
                          "px-2 py-1.5 text-sm focus:bg-accent focus:text-accent-foreground rounded-sm",
                          index === focusedIndex && "bg-accent text-accent-foreground"
                        )
                      : cn(
                          "px-3 py-2 hover:bg-gray-100 focus:bg-gray-100",
                          index === focusedIndex && "bg-gray-100"
                        )
                  )}
                >
                  <div className="flex-1">
                    <div className={variant === "select-like" ? "" : "font-medium"}>
                      {option.label}
                    </div>
                    {showDescriptions && option.description && (
                      <div className={cn(
                        "text-sm",
                        variant === "select-like" ? "text-muted-foreground" : "text-gray-500"
                      )}>
                        {option.description}
                      </div>
                    )}
                  </div>
                  {value === option.label && (
                    <div className={cn(
                      variant === "select-like" ? "text-accent-foreground" : "text-[#D8550D]"
                    )}>
                      <CheckIcon className="h-4 w-4" />
                    </div>
                  )}
                </button>
              ))
            ) : searchText && (
              <div className={cn(
                "px-2 py-2 text-sm",
                variant === "select-like" ? "text-muted-foreground" : "text-gray-500"
              )}>
                No results found
              </div>
            )}
          </div>
          
          {/* Create New Option Button */}
          {showCreateButton && onCreateNew && (
            <>
              {/* Separator */}
              <div className={cn(
                "border-t",
                variant === "select-like" ? "border-border" : "border-gray-200"
              )} />
              
              {/* Create New Option */}
              <div className="p-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    closeDropdown()
                    onCreateNew()
                  }}
                  className={cn(
                    "w-full h-8 text-sm justify-start",
                    variant === "select-like" 
                      ? "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground" 
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {createNewLabel}
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// Export the option type for convenience
export type { SearchableSelectOption }