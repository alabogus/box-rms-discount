# Box Dashboard Boilerplate

A complete Next.js dashboard boilerplate with Shadcn UI, TypeScript, and a comprehensive design system ready for your next project.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css)
![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-Latest-orange)

## 🚀 What's Included

### 🎨 Design System
- **Complete Shadcn UI component library** - Pre-configured with all essential components
- **Consistent color palette and typography** - Professional design tokens
- **Responsive layout patterns** - Mobile-first approach
- **Dark/light mode ready** - Easy theme switching

### ⚡ Developer Experience
- **TypeScript for type safety** - Full type coverage
- **ESLint and Prettier configured** - Code quality enforcement
- **Hot reload and fast refresh** - Instant development feedback
- **Ready for deployment** - Optimized for Vercel, Netlify, and other platforms

### 📦 Pre-built Pages

1. **Components Library** (`/components`) - Showcase of all available UI components
2. **Starter Page** (`/starter-page`) - Template with common patterns for quick feature development
3. **New Feature** (`/new-feature`) - Development template with guidelines for building new features

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── components/         # Component showcase page
│   ├── starter-page/      # Generic starter template
│   ├── new-feature/       # Development template
│   └── page.tsx           # Landing page
├── components/
│   ├── layout/            # Layout components (Sidebar, Layout)
│   ├── providers/         # Context providers (Toast)
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and design system
└── types/                 # TypeScript type definitions
```

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd box-dashboard-boilerplate
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the boilerplate.

### 3. Customize for Your Project

1. **Update Branding**: Replace logo in `/public/box-logo.svg`
2. **Customize Colors**: Edit design tokens in `/src/lib/design-system.ts`
3. **Add Pages**: Use the starter page template as a foundation
4. **Modify Navigation**: Update sidebar items in `/src/components/layout/sidebar.tsx`

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 🎯 Getting Started with Your First Feature

### Option 1: Use the Starter Page Template

1. Copy `/src/app/starter-page/page.tsx`
2. Create a new directory `/src/app/your-feature/`
3. Paste and modify the template
4. Add navigation link in sidebar

### Option 2: Use the New Feature Development Template

1. Visit `/new-feature` page for development guidelines
2. Follow the quick start guide and best practices
3. Use the included form and component examples

## 🛠️ Available Components

### Layout Components
- `Layout` - Main layout wrapper with sidebar
- `Sidebar` - Collapsible navigation sidebar

### Form Components  
- `FormField` - Unified form field (text, select, textarea)
- `FormSheet` - Slide-out form pattern
- `SearchInput` - Search input with icon

### Data Display
- `DataTable` - Feature-rich table with sorting and actions
- `StatusBadge` - Color-coded status indicators
- `MetricCard` - Dashboard metric cards

### UI Components
- All Shadcn UI components (Button, Card, Input, etc.)
- Custom toast notification system
- Responsive navigation patterns

## 🎨 Design System

The boilerplate includes a comprehensive design system located in `/src/lib/design-system.ts`:

- **Colors**: Primary, secondary, and semantic color palettes
- **Typography**: Font scales and weights
- **Spacing**: Consistent spacing scale
- **Component Patterns**: Reusable component styles

## 📦 Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy to Vercel
```

### Other Platforms

The boilerplate works with any platform that supports Next.js:

- **Netlify**: Use the Next.js plugin
- **AWS Amplify**: Deploy with built-in Next.js support  
- **Docker**: Include the provided Dockerfile

## 🔧 Customization

### Updating the Color Scheme

1. Edit `/src/lib/design-system.ts`
2. Update primary color values
3. Components will automatically use the new colors

### Adding New Components

1. Create component in `/src/components/ui/`
2. Export from `/src/components/ui/index.ts`
3. Add to the components showcase page

### Modifying Layout

1. Update sidebar navigation in `/src/components/layout/sidebar.tsx`
2. Modify layout structure in `/src/components/layout/layout.tsx`

## 📄 License

MIT License - feel free to use this boilerplate for your projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using Next.js, TypeScript, and Shadcn UI**