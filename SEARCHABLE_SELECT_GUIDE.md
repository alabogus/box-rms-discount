# Searchable Select Component Guide

This guide explains how to use the custom SearchableSelect component that was integrated from your box-dashboard project.

## Overview

The SearchableSelect component is a powerful, searchable dropdown with keyboard navigation, global dropdown management, and optional "create new" functionality. It's designed to replace standard select inputs where users need to search through many options.

## Components Available

### 1. SearchableSelect (Main Component)
Located: `/src/components/ui/searchable-select.tsx`
- Full-featured searchable dropdown
- Two visual variants: "default" and "select-like"
- All features and customization options

### 2. SearchableDropdown (Wrapper)
Located: `/src/components/ui/searchable-dropdown.tsx`
- Convenient wrapper around SearchableSelect
- Always uses "select-like" variant for consistency
- Cleaner API for common use cases

## Basic Usage

```tsx
import { SearchableSelect, SearchableSelectOption } from "@/components/ui/searchable-select"
// OR
import { SearchableDropdown, SearchableDropdownOption } from "@/components/ui/searchable-dropdown"

const options: SearchableSelectOption[] = [
  { id: 1, label: "React", description: "A JavaScript library for building user interfaces" },
  { id: 2, label: "Vue.js", description: "The Progressive JavaScript Framework" },
  { id: 3, label: "Angular", description: "Platform for building mobile and desktop web applications" },
]

function MyComponent() {
  const [value, setValue] = useState("")
  
  return (
    <SearchableSelect
      value={value}
      onChange={setValue}
      placeholder="Search and select framework..."
      options={options}
    />
  )
}
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | **Required.** Currently selected value |
| `onChange` | `(value: string) => void` | - | **Required.** Called when selection changes |
| `placeholder` | `string` | "Select option" | Placeholder text |
| `required` | `boolean` | `false` | Whether field is required |
| `className` | `string` | "" | Additional CSS classes |
| `options` | `SearchableSelectOption[]` | `[]` | Array of selectable options |
| `onCreateNew` | `() => void` | - | Called when "Create New" is clicked |
| `createNewLabel` | `string` | "Create new option" | Text for create button |
| `showCreateButton` | `boolean` | `false` | Whether to show create button |
| `variant` | `"default" \| "select-like"` | "select-like" | Visual styling variant |
| `showDescriptions` | `boolean` | `true` | Whether to show option descriptions |
| `size` | `"sm" \| "default"` | "default" | Component size |
| `disabled` | `boolean` | `false` | Whether component is disabled |

## Option Format

```tsx
interface SearchableSelectOption {
  id: number | string    // Unique identifier
  label: string         // Display text (what gets selected)
  description?: string  // Optional subtitle/description
}
```

## Features

### 🔍 Search Functionality
- Type to filter options by label or description
- Case-insensitive search
- Real-time filtering as you type

### ⌨️ Keyboard Navigation
- **Arrow Down/Up**: Navigate through options
- **Enter**: Select focused option
- **Escape**: Close dropdown
- Full accessibility support

### 🎯 Global Dropdown Management
- Only one dropdown open at a time
- Automatically closes other dropdowns when opening new one
- Handles click-outside to close

### ➕ Create New Option
- Optional "Create New" button at bottom
- Customizable label and action
- Integrates with existing forms/modals

### 🎨 Styling Options
- Two visual variants for different contexts
- Size options (small/default)
- Consistent with design system
- Show/hide descriptions

## Common Patterns

### 1. Basic Searchable Select
```tsx
<SearchableSelect
  value={selectedFramework}
  onChange={setSelectedFramework}
  placeholder="Choose a framework..."
  options={frameworkOptions}
/>
```

### 2. With Create New Option
```tsx
<SearchableSelect
  value={selectedSupplier}
  onChange={setSelectedSupplier}
  placeholder="Select or create supplier..."
  options={supplierOptions}
  showCreateButton={true}
  createNewLabel="Create new supplier"
  onCreateNew={() => setShowSupplierForm(true)}
/>
```

### 3. Compact Version (No Descriptions)
```tsx
<SearchableSelect
  value={selectedCategory}
  onChange={setSelectedCategory}
  placeholder="Category..."
  options={categoryOptions}
  size="sm"
  showDescriptions={false}
/>
```

### 4. Converting from Standard Select
```tsx
// Before (standard select)
<Select value={value} onValueChange={onChange}>
  <SelectTrigger>
    <SelectValue placeholder="Choose option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>

// After (searchable select)
<SearchableSelect
  value={value}
  onChange={onChange}
  placeholder="Choose option"
  options={[
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
  ]}
/>
```

## Integration Examples

### Form Integration
```tsx
<div className="space-y-2">
  <Label htmlFor="supplier-select">Supplier *</Label>
  <SearchableSelect
    value={formData.supplier}
    onChange={(value) => setFormData(prev => ({ ...prev, supplier: value }))}
    placeholder="Select supplier..."
    options={suppliers.map(s => ({
      id: s.id,
      label: s.legalName,
      description: s.contactPerson
    }))}
    showCreateButton={true}
    createNewLabel="Create new supplier"
    onCreateNew={() => setShowSupplierForm(true)}
    required
  />
</div>
```

### Filter/Search Interface
```tsx
<div className="flex gap-4">
  <SearchInput
    placeholder="Search items..."
    value={searchTerm}
    onChange={setSearchTerm}
  />
  <SearchableSelect
    value={categoryFilter}
    onChange={setCategoryFilter}
    placeholder="Filter by category"
    options={categories.map(cat => ({
      id: cat.id,
      label: cat.name,
      description: `${cat.itemCount} items`
    }))}
    className="w-48"
  />
</div>
```

## Comparison with Original Box-Dashboard

This implementation maintains all the core functionality from your original `SelectInput` component:

✅ **Preserved Features:**
- Search functionality
- Keyboard navigation  
- Global dropdown management
- Create new option integration
- Visual styling options
- Accessibility features

🆕 **Enhancements:**
- Better TypeScript integration
- Consistent with your current design system
- Size variants
- Disabled state support
- More flexible styling options
- Better documentation

## Performance Notes

- Component uses React refs and state management efficiently
- Global dropdown state prevents multiple open dropdowns
- Optimized re-renders with proper dependency arrays
- Smooth animations and transitions

## Accessibility

- Full keyboard navigation support
- Proper ARIA attributes
- Focus management
- Screen reader friendly
- High contrast support

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Touch-friendly on mobile devices

This component is now ready to use throughout your application as a powerful alternative to standard select inputs!