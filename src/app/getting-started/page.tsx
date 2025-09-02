"use client";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Layers, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GettingStartedPage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Getting Started
            </h1>
            <p className="text-gray-600 mt-1">Complete Next.js dashboard boilerplate with Shadcn UI and TypeScript</p>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="border border-gray-200 rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Box Dashboard Boilerplate</h3>
            <p className="text-sm text-gray-600 mt-1">
              A comprehensive design system ready for your next project
            </p>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <div className="h-16 w-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Package className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                A complete Next.js dashboard boilerplate with Shadcn UI, TypeScript, and 
                a comprehensive design system ready for your next project.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Badge variant="outline" className="px-3 py-1">
                  Next.js 15
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  TypeScript
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  Tailwind CSS
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  Shadcn UI
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Cards */}
        <div className="border border-gray-200 rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Quick Start</h3>
            <p className="text-sm text-gray-600 mt-1">
              Explore the available pages and start building
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:border-orange-200 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="h-5 w-5 text-orange-600" />
                  <h4 className="font-semibold">Components Library</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Explore the pre-built UI components and design patterns
                </p>
                <Link href="/components">
                  <Button className="w-full text-white" style={{ backgroundColor: '#D8550D' }}>
                    View Components
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:border-orange-200 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-5 w-5 text-orange-600" />
                  <h4 className="font-semibold">New Feature</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Development template with guidelines for building new features
                </p>
                <Link href="/">
                  <Button className="w-full text-white" style={{ backgroundColor: '#D8550D' }}>
                    Start Building
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="border border-gray-200 rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">What&apos;s Included</h3>
            <p className="text-sm text-gray-600 mt-1">
              Everything you need to build modern dashboard applications
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">🎨 Design System</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Complete Shadcn UI component library</li>
                  <li>• Consistent color palette and typography</li>
                  <li>• Responsive layout patterns</li>
                  <li>• Dark/light mode ready</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">⚡ Developer Experience</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• TypeScript for type safety</li>
                  <li>• ESLint and Prettier configured</li>
                  <li>• Hot reload and fast refresh</li>
                  <li>• Ready for deployment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started Steps */}
        <div className="border border-gray-200 rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Getting Started</h3>
            <p className="text-sm text-gray-600 mt-1">
              Quick steps to customize this boilerplate for your project
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">1. Clone & Install</h4>
                <code className="text-sm bg-white px-2 py-1 rounded border">
                  npm install && npm run dev
                </code>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">2. Customize</h4>
                <p className="text-sm text-gray-600">
                  Update colors, fonts, and components in the design system files
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">3. Build Features</h4>
                <p className="text-sm text-gray-600">
                  Use the new feature page template to quickly build features
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}