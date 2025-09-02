"use client";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Layers, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 w-16 bg-orange-100 rounded-2xl flex items-center justify-center">
              <Package className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Box Dashboard Boilerplate</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A complete Next.js dashboard boilerplate with Shadcn UI, TypeScript, and 
            a comprehensive design system ready for your next project.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
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

        {/* Quick Start Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-2 hover:border-orange-200 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-orange-600" />
                Components Library
              </CardTitle>
              <CardDescription>
                Explore the pre-built UI components and design patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/components">
                <Button className="w-full text-white" style={{ backgroundColor: '#D8550D' }}>
                  View Components
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-orange-200 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-orange-600" />
                New Feature
              </CardTitle>
              <CardDescription>
                Development template with guidelines for building new features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/new-feature">
                <Button className="w-full text-white" style={{ backgroundColor: '#D8550D' }}>
                  Start Building
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <Card>
          <CardHeader>
            <CardTitle>What&apos;s Included</CardTitle>
            <CardDescription>
              Everything you need to build modern dashboard applications
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Quick steps to customize this boilerplate for your project
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
