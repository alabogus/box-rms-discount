# Component Library Guide

This guide explains how to use the custom components integrated from your box-dashboard project.

## Components Available

### 1. SearchableSelect Component
**Location:** `/src/components/ui/searchable-select.tsx`

### 2. NavItem Component  
**Location:** `/src/components/ui/nav-item.tsx`

### 3. PageHeader Component
**Location:** `/src/components/ui/page-header.tsx`

---

## SearchableSelect Component

A powerful, searchable dropdown with keyboard navigation, global dropdown management, and optional "create new" functionality.

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

---

## NavItem Component

The NavItem component provides horizontal navigation tabs with the signature orange active state from your box-dashboard design.

### Overview

NavItem creates clean, accessible navigation tabs perfect for switching between different views or sections. It matches the exact styling from your box-dashboard project.

### Components Available

#### 1. NavItem (Individual Tab)
```tsx
<NavItem 
  label="Tab Name" 
  isActive={true} 
  onClick={() => setActiveTab('tab1')} 
/>
```

#### 2. NavTabs (Complete Navigation)
```tsx
<NavTabs
  items={[
    { id: "tab1", label: "Stock item" },
    { id: "tab2", label: "Stock Movements" },
    { id: "tab3", label: "Suppliers" }
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

### Props Reference

#### NavItem Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | **Required.** Tab label text |
| `isActive` | `boolean` | `false` | Whether tab is currently active |
| `onClick` | `() => void` | - | Click handler function |
| `className` | `string` | "" | Additional CSS classes |
| `disabled` | `boolean` | `false` | Whether tab is disabled |

#### NavTabs Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Array<{id: string, label: string, disabled?: boolean}>` | - | **Required.** Array of tab items |
| `activeTab` | `string` | - | **Required.** Currently active tab ID |
| `onTabChange` | `(tabId: string) => void` | - | **Required.** Tab change handler |
| `className` | `string` | "" | Additional CSS classes |

### Usage Examples

#### Basic Navigation Tabs
```tsx
import { NavTabs } from "@/components/ui/nav-item"

function MyComponent() {
  const [activeTab, setActiveTab] = useState("overview")
  
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "details", label: "Details" },
    { id: "settings", label: "Settings" }
  ]
  
  return (
    <div>
      <NavTabs
        items={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      {/* Tab content */}
      {activeTab === "overview" && <OverviewContent />}
      {activeTab === "details" && <DetailsContent />}
      {activeTab === "settings" && <SettingsContent />}
    </div>
  )
}
```

#### Individual NavItem Usage
```tsx
import { NavItem } from "@/components/ui/nav-item"

function CustomNavigation() {
  const [currentSection, setCurrentSection] = useState("home")
  
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        <NavItem
          label="Home"
          isActive={currentSection === "home"}
          onClick={() => setCurrentSection("home")}
        />
        <NavItem
          label="Products"
          isActive={currentSection === "products"}
          onClick={() => setCurrentSection("products")}
        />
        <NavItem
          label="Coming Soon"
          disabled={true}
        />
      </nav>
    </div>
  )
}
```

#### Box-Dashboard Style Navigation
```tsx
// Recreate the exact navigation from box-dashboard
const inventoryTabs = [
  { id: "stock-item", label: "Stock item" },
  { id: "stock-movements", label: "Stock Movements" },
  { id: "suppliers", label: "Suppliers" },
  { id: "measuring-unit", label: "Measuring unit" },
  { id: "stock-group", label: "Stock group" },
  { id: "settings", label: "Settings" }
]

<NavTabs
  items={inventoryTabs}
  activeTab={activeInventoryTab}
  onTabChange={setActiveInventoryTab}
/>
```

### Styling Features

#### Orange Active State
- **Active tab**: Orange text (`text-orange-600`) with orange bottom border (`border-b-orange-500`)
- **Inactive tabs**: Gray text (`text-gray-500`) with transparent border
- **Hover states**: Smooth color transitions

#### Accessibility
- Proper button semantics
- Keyboard navigation support
- Focus states
- ARIA-compliant navigation

#### Responsive Design
- Works on all screen sizes
- Touch-friendly on mobile
- Flexible spacing

### Integration with Other Components

#### With SearchableSelect
```tsx
<div className="space-y-6">
  <NavTabs
    items={mainTabs}
    activeTab={activeTab}
    onTabChange={setActiveTab}
  />
  
  {activeTab === "inventory" && (
    <SearchableSelect
      value={selectedItem}
      onChange={setSelectedItem}
      options={inventoryOptions}
      placeholder="Search inventory..."
    />
  )}
</div>
```

#### In Dashboard Layouts
```tsx
<Layout>
  <div className="space-y-6">
    <div>
      <h1>Inventory Management</h1>
      <p>Manage your restaurant inventory</p>
    </div>
    
    <NavTabs
      items={inventoryTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
    
    <div className="mt-6">
      {renderTabContent()}
    </div>
  </div>
</Layout>
```

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Touch-friendly interactions
- Smooth transitions and animations

The NavItem component perfectly recreates the navigation experience from your box-dashboard project!

---

## PageHeader Component

The PageHeader component provides a consistent, reusable header layout for pages with title, description, and optional action buttons.

### Overview

PageHeader creates a standard page header with title and description on the left, and optional action buttons (like "Test Form") positioned on the right side. This ensures consistent layout patterns across all pages.

### Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | **Required.** Page title text |
| `description` | `string` | - | Optional page description/subtitle |
| `className` | `string` | "" | Additional CSS classes |
| `children` | `ReactNode` | - | Action buttons or other elements to display on the right |

### Usage Examples

#### Basic Page Header
```tsx
import { PageHeader } from "@/components/ui/page-header"

function MyPage() {
  return (
    <div>
      <PageHeader
        title="Page Title"
        description="Optional description text"
      />
      {/* Page content */}
    </div>
  )
}
```

#### Page Header with Action Buttons
```tsx
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

function ComponentsPage() {
  return (
    <div>
      <PageHeader
        title="Components"
        description="Explore pre-built UI components and design patterns"
      >
        <Button onClick={() => openForm()}>
          <Plus className="h-4 w-4 mr-2" />
          Test Form
        </Button>
      </PageHeader>
      {/* Page content */}
    </div>
  )
}
```

#### Dynamic Header with Conditional Actions
```tsx
function DynamicPage() {
  const [activeTab, setActiveTab] = useState("overview")
  
  const getTabInfo = () => {
    return activeTab === "components" 
      ? { title: "Components", description: "Component library" }
      : { title: "Overview", description: "Project overview" }
  }
  
  const tabInfo = getTabInfo()
  
  return (
    <PageHeader
      title={tabInfo.title}
      description={tabInfo.description}
    >
      {activeTab === "components" && (
        <Button>Test Form</Button>
      )}
    </PageHeader>
  )
}
```

### Features

#### Consistent Layout
- Standardized spacing and typography
- Left-aligned title and description
- Right-aligned action buttons
- Responsive design

#### Flexible Actions
- Support for any React components as children
- Multiple buttons or elements can be added
- Automatic spacing between multiple actions

#### Accessibility
- Proper heading hierarchy with h1 tags
- Semantic HTML structure
- Focus management for interactive elements

### Design Specifications

- **Title**: `text-3xl font-bold text-gray-900`
- **Description**: `text-gray-600 mt-1`
- **Layout**: Flexbox with `justify-between`
- **Action spacing**: `gap-3` between multiple actions

The PageHeader component ensures consistent page layouts and reduces code duplication across the application!