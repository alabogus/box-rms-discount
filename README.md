This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# RMS Dashboard - Design Prototype Boilerplate

A comprehensive design prototype boilerplate built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Shadcn UI**. This boilerplate extracts and enhances the design patterns from your existing [box-dashboard](https://github.com/TheKishorKumar/box-dashboard) project to create a consistent, rapid prototyping foundation.

## 🎯 Purpose

This boilerplate is designed specifically for **product designers** who need to:
- Build interactive prototypes quickly
- Communicate flows effectively with stakeholders and developers
- Maintain design system consistency across features
- Iterate rapidly for user testing
- Bridge the gap between Figma designs and functional prototypes

## 🚀 Key Features

### 📐 **Extracted Design System**
- **Brand Colors**: Orange primary (#D8550D) with consistent hover states
- **Typography**: Structured heading and body text patterns
- **Spacing**: Consistent spacing and layout patterns
- **Status System**: Color-coded status indicators for various states

### 🧩 **Reusable Components**

#### Layout Components
- **`<Layout>`**: Main application wrapper with sidebar and header
- **`<Sidebar>`**: Collapsible navigation with icons and badges
- **`<Header>`**: Top navigation with search, notifications, and user menu

#### Form Components
- **`<FormSheet>`**: Slide-out form pattern (extracted from box-dashboard)
- **`<FormField>`**: Unified form field with validation support
- **`<SearchInput>`**: Search input with icon

#### Data Display
- **`<DataTable>`**: Feature-rich table with sorting, actions, and empty states
- **`<StatusBadge>`**: Color-coded status indicators with icons
- **`<MetricCard>`**: Dashboard metric cards with trend indicators

#### UI Primitives
- All Shadcn UI components pre-configured
- Consistent styling and behavior patterns

### 🛠 **Utility Functions**

#### Currency & Formatting
```
formatNepaliCurrency(1500) // "रु 1,500.00"
formatCurrency(125000)     // "रु 1,25,000.00"
formatDate(new Date())     // "Jan 15, 2024"

```

#### Data Management
```
// Search and filter utilities
searchItems(items, "rice", ['name', 'category'])
filterByCategory(items, "grains")
sortBy(items, 'name', 'asc')

// Validation utilities
isValidEmail("user@example.com")
isValidPhone("+977-9876543210")

```

#### Storage & State
```
// localStorage with error handling
const [data, setData] = useLocalStorage('key', defaultValue)

// Toast notifications
const { addToast } = useToast()
addToast('success', 'Item saved successfully')

```


### 📱 **Responsive Design**
- **Desktop**: Full sidebar with expanded navigation
- **Tablet**: Collapsible sidebar with touch-friendly interactions  \n- **Mobile**: Overlay sidebar with optimized mobile experience

## 🏗️ **Project Structure**

```
src/
├── app/                     # Next.js app router pages
│   ├── page.tsx            # Main dashboard (showcases all components)
│   └── inventory/          # Example module page
├── components/
│   ├── layout/             # Layout components (Sidebar, Header, Layout)
│   └── ui/                 # Reusable UI components
├── hooks/                  # Custom React hooks
│   ├── useLocalStorage.ts  # localStorage management
│   ├── useToast.ts        # Toast notifications
│   └── useHydration.ts    # SSR hydration handling
├── lib/
│   ├── design-system.ts   # Design system constants
│   └── utils.ts           # Utility functions
└── types/
    └── index.ts           # TypeScript definitions

```


## 🎨 **Design System Reference**

### Colors
```
// Primary Brand
colors.primary.main    // #D8550D
colors.primary.hover   // #A8420A

// Status Colors
colors.status.success  // Green system
colors.status.warning  // Orange system  \n
colors.status.error    // Red system

```


### Typography
```
typography.heading.h1  // text-2xl font-bold text-gray-900
typography.body.default // text-sm text-gray-600
typography.label       // text-sm font-medium

```


### Component Patterns
```
patterns.form.sheet    // Sheet form layout classes
patterns.table.row     // Table row hover states
patterns.button.primary // Primary button styling

```


## ⚡ **Quick Start Guide**

### 1. **Development**
```
npm run dev

```
Open http://localhost:3000 to see the dashboard

### 2. **Create New Pages**
```
// src/app/your-feature/page.tsx
import { Layout } from "@/components/layout";

export default function YourFeaturePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Your Feature</h1>
        {/* Your content here */}
      </div>
    </Layout>
  );
}

```


### 3. **Use Form Patterns**
```
<FormSheet
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Add New Item"
  onSubmit={handleSubmit}
>
  <FormField
    id="name"
    label="Name"
    value={name}
    onChange={setName}
    required
  />
</FormSheet>

```


### 4. **Display Data**
```
<DataTable
  data={items}
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status', render: (status) => 
      <StatusBadge status={status} /> 
    }
  ]}
  actions={[
    { label: 'Edit', onClick: handleEdit, icon: Edit },
    { label: 'Delete', onClick: handleDelete, icon: Trash2, variant: 'destructive' }
  ]}
/>

```


## 🎯 **Rapid Prototyping Workflow**

### 1. **Start with Layout**
- Use `<Layout>` wrapper for consistent navigation
- Add your page to sidebar navigation in `src/components/layout/sidebar.tsx`

### 2. **Build Forms Quickly**
- Use `<FormSheet>` for slide-out creation/editing forms
- Use `<FormField>` components for consistent field styling
- Leverage built-in validation and error handling

### 3. **Display Data Consistently**
- Use `<DataTable>` for tabular data with built-in actions
- Use `<MetricCard>` for dashboard metrics
- Use `<StatusBadge>` for status indicators

### 4. **Maintain State**
- Use `useLocalStorage` for prototype data persistence
- Use `useToast` for user feedback
- Follow established patterns for form handling

## 🔧 **Customization**

### Update Brand Colors
```
// src/lib/design-system.ts
export const colors = {
  primary: {
    main: '#YOUR_PRIMARY_COLOR',
    hover: '#YOUR_HOVER_COLOR',
  }
};

```


### Add New Components
```
// Follow existing patterns in src/components/ui/
// Use design system constants for consistency
// Include TypeScript props interface

```


### Extend Navigation
```
// src/components/layout/sidebar.tsx
const navigationItems = [
  // Add your new navigation items
  {
    id: "your-feature",
    label: "Your Feature", 
    href: "/your-feature",
    icon: YourIcon,
  }
];

```


## 📋 **Best Practices**

### **Component Development**
- Keep components under 400 lines
- Use TypeScript interfaces for all props
- Follow consistent naming conventions
- Include proper error handling

### **State Management**
- Use custom hooks for reusable logic
- Implement proper loading and error states
- Follow established localStorage patterns

### **Styling**
- Use design system constants
- Follow established spacing and typography patterns
- Maintain responsive design principles

## 🚀 **Production Considerations**

This boilerplate is optimized for **design prototyping**. For production use:

- [ ] Add proper authentication system
- [ ] Implement real backend integration
- [ ] Add comprehensive error handling
- [ ] Include proper data validation
- [ ] Add unit and integration tests
- [ ] Implement proper security measures
- [ ] Add performance optimizations
- [ ] Include accessibility improvements

## 📄 **License**

This project is for design prototyping and demonstration purposes.

---
**Built with ❤️ for rapid prototyping and design iteration**

Based on patterns from [box-dashboard](https://github.com/TheKishorKumar/box-dashboard) and optimized for product design workflows.
