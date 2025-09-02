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

# Box Dashboard Boilerplate

A modern Next.js 15 dashboard boilerplate with TypeScript, Tailwind CSS, and Shadcn UI components.

## 🚀 Features

- **Next.js 15** with TypeScript and ESLint
- **Shadcn UI** components with Neutral color scheme
- **Box branding** with logo and favicon
- **Responsive sidebar navigation** with collapse/expand
- **Settings and notifications** logically grouped
- **Toast notification system**
- **Mobile-optimized** with floating menu button
- **Header-free layout** for maximum content space
- **Ready for rapid prototyping**

## 🛠️ Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Shadcn UI
- Lucide React Icons
- Custom hooks and utilities

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/alabogus/box-boilerplate.git
cd box-boilerplate

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Deployment

This project is configured for easy deployment on Vercel:

### Auto-deployment from GitHub:
1. Push your code to GitHub (already configured)
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy on every push to `main`

### Manual deployment:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
├── components/
│   ├── layout/            # Layout components (Sidebar, Layout)
│   ├── providers/         # Context providers (Toast)
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and design system
└── types/               # TypeScript type definitions
```

## 🎨 Customization

### Colors
The design system uses Box's orange theme (`#D8550D`). Update `src/lib/design-system.ts` to customize colors.

### Components
All components are in `src/components/ui/` and can be customized as needed.

### Navigation
Update navigation items in `src/components/layout/sidebar.tsx`.

## 📝 License

MIT License - feel free to use this boilerplate for your projects.
