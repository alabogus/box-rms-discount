"use client";

import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NavTabs } from "@/components/ui/nav-item";
import { FormField } from "@/components/ui/form-field";
import { FormSheet } from "@/components/ui/form-sheet";
import { SearchInput } from "@/components/ui/search-input";
import { SearchableSelect, SearchableSelectOption } from "@/components/ui/searchable-select";
import { NavItem } from "@/components/ui/nav-item";
import { StatusBadge } from "@/components/ui/status-badge";
import { DataTable } from "@/components/ui/data-table";
import { MetricCard } from "@/components/ui/metric-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";
import {
  Package,
  Layers,
  Sparkles,
  ArrowRight,
  Users,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function GettingStartedPage() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Components page state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [searchableSelectValue, setSearchableSelectValue] = useState("");
  const [searchableSelectWithCreateValue, setSearchableSelectWithCreateValue] = useState("");
  const [activeNavTab, setActiveNavTab] = useState("tab1");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });

  // Navigation tabs
  const mainTabs = [
    { id: "overview", label: "Overview" },
    { id: "components", label: "Components" },
  ];

  // Sample data for NavTabs demo
  const navTabItems = [
    { id: "tab1", label: "Stock item" },
    { id: "tab2", label: "Stock Movements" },
    { id: "tab3", label: "Suppliers" },
    { id: "tab4", label: "Measuring unit" },
    { id: "tab5", label: "Stock group" },
    { id: "tab6", label: "Settings", disabled: true },
  ];

  // Sample data for SearchableSelect
  const searchableOptions: SearchableSelectOption[] = [
    { id: 1, label: "React", description: "A JavaScript library for building user interfaces" },
    { id: 2, label: "Vue.js", description: "The Progressive JavaScript Framework" },
    { id: 3, label: "Angular", description: "Platform for building mobile and desktop web applications" },
    { id: 4, label: "Next.js", description: "The React Framework for Production" },
    { id: 5, label: "Nuxt.js", description: "The Intuitive Vue Framework" },
    { id: 6, label: "Svelte", description: "Cybernetically enhanced web apps" },
    { id: 7, label: "TypeScript", description: "Typed JavaScript at Any Scale" },
    { id: 8, label: "JavaScript", description: "The programming language of the web" },
  ];

  const handleCreateNew = () => {
    console.log('Create new option clicked');
  };

  // Sample data for components demonstration
  const sampleTableData = [
    {
      id: "1",
      name: "Button Component",
      type: "Interactive",
      status: "Available",
      description: "Primary action buttons with variants",
    },
    {
      id: "2", 
      name: "FormField Component",
      type: "Form",
      status: "Available",
      description: "Unified form field with validation",
    },
    {
      id: "3",
      name: "DataTable Component", 
      type: "Data Display",
      status: "Available",
      description: "Feature-rich table with sorting and actions",
    },
  ];

  const tableColumns = [
    {
      key: 'name' as keyof typeof sampleTableData[0],
      label: 'Component',
      render: (value: unknown, row: typeof sampleTableData[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <Layers className="h-4 w-4 text-orange-600" />
          </div>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-gray-500">{row.description}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'type' as keyof typeof sampleTableData[0],
      label: 'Type',
    },
    {
      key: 'status' as keyof typeof sampleTableData[0],
      label: 'Status',
      render: (value: unknown) => <StatusBadge status={value as string} />,
    },
  ];

  const tableActions = [
    {
      label: 'View Code',
      icon: Edit,
      onClick: (row: typeof sampleTableData[0]) => {
        console.log('View code:', row.name);
      },
    },
    {
      label: 'Copy',
      icon: Trash2,
      onClick: (row: typeof sampleTableData[0]) => {
        console.log('Copy:', row.name);
      },
    },
  ];

  const handleFormSubmit = () => {
    console.log('Form submitted:', formData);
    setIsFormOpen(false);
    setFormData({ name: "", description: "", category: "" });
  };

  const renderOverviewContent = () => (
    <div className="space-y-8">
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
            Explore the available features and start building
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
              <Button 
                onClick={() => setActiveTab("components")}
                className="w-full text-white" 
                style={{ backgroundColor: '#D8550D' }}
              >
                View Components
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-orange-200 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-orange-600" />
                <h4 className="font-semibold">New Feature</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Development template with guidelines for building new features
              </p>
              <Link href="/new-feature">
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
  );

  const renderComponentsContent = () => (
    <div className="space-y-8">
      {/* Test Form Button */}
      <div className="flex justify-end">
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="text-white"
          style={{ backgroundColor: '#D8550D' }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Test Form
        </Button>
      </div>

      {/* Metrics Cards Demo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Components"
          value="24"
          change={{ value: 12, type: 'increase', period: 'this month' }}
          icon={Layers}
        />
        <MetricCard
          title="Form Components"
          value="8"
          change={{ value: 5, type: 'increase', period: 'this week' }}
          icon={Edit}
        />
        <MetricCard
          title="Data Components"
          value="6"
          change={{ value: 2, type: 'increase', period: 'this month' }}
          icon={Package}
        />
        <MetricCard
          title="Layout Components"
          value="4"
          icon={Users}
        />
      </div>

      {/* Buttons Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Button Components</CardTitle>
          <CardDescription>Different button variants and sizes from Shadcn UI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button>Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
          </div>
        </CardContent>
      </Card>

      {/* Status Badges Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Status Badge Components</CardTitle>
          <CardDescription>Color-coded status indicators with icons</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="Available" />
            <StatusBadge status="Low Quantity" />
            <StatusBadge status="Out of Stock" />
            <StatusBadge status="Pending" />
            <StatusBadge status="Active" />
            <StatusBadge status="Inactive" />
            <StatusBadge status="Draft" />
          </div>
        </CardContent>
      </Card>

      {/* SearchableSelect Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Searchable Select Components</CardTitle>
          <CardDescription>Custom searchable dropdown with keyboard navigation and create option</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-gray-700">Basic Searchable Select</h4>
              <SearchableSelect
                value={searchableSelectValue}
                onChange={setSearchableSelectValue}
                placeholder="Search and select framework..."
                options={searchableOptions}
                className="w-full"
              />
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-gray-700">With Create New Option</h4>
              <SearchableSelect
                value={searchableSelectWithCreateValue}
                onChange={setSearchableSelectWithCreateValue}
                placeholder="Search or create new..."
                options={searchableOptions}
                showCreateButton={true}
                createNewLabel="Create new framework"
                onCreateNew={handleCreateNew}
                className="w-full"
              />
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-gray-700">Small Size Variant</h4>
              <SearchableSelect
                value={searchableSelectValue}
                onChange={setSearchableSelectValue}
                placeholder="Small size..."
                options={searchableOptions.slice(0, 4)}
                size="sm"
                showDescriptions={false}
                className="w-full"
              />
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-gray-700">Disabled State</h4>
              <SearchableSelect
                value="React"
                onChange={() => {}}
                placeholder="Disabled..."
                options={searchableOptions}
                disabled={true}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm text-gray-700 mb-2">Features:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Type to search through options</li>
              <li>• Keyboard navigation (Arrow keys, Enter, Escape)</li>
              <li>• Optional "Create New" functionality</li>
              <li>• Global dropdown management (only one open at a time)</li>
              <li>• Customizable styling and sizes</li>
              <li>• Show/hide descriptions</li>
              <li>• Focus management and accessibility</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* NavItem Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Navigation Tab Components</CardTitle>
          <CardDescription>Horizontal navigation tabs with orange active state from box-dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-gray-700">Individual NavItem Components</h4>
              <div className="flex space-x-8 border-b border-gray-200 -mb-px">
                <NavItem label="Active Tab" isActive={true} />
                <NavItem label="Inactive Tab" isActive={false} />
                <NavItem label="Disabled Tab" disabled={true} />
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-gray-700">Complete NavTabs Component</h4>
              <NavTabs
                items={navTabItems}
                activeTab={activeNavTab}
                onTabChange={setActiveNavTab}
              />
              <p className="text-sm text-gray-500">Active tab: {navTabItems.find(item => item.id === activeNavTab)?.label}</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm text-gray-700 mb-2">Features:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Orange active state matching box-dashboard design</li>
              <li>• Clean horizontal tab navigation</li>
              <li>• Hover and focus states</li>
              <li>• Disabled state support</li>
              <li>• Individual NavItem or complete NavTabs wrapper</li>
              <li>• TypeScript support with proper types</li>
              <li>• Responsive and accessible design</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Form Components Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Form Components</CardTitle>
          <CardDescription>Input fields and form controls with consistent styling</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="demo-input">Input Field</Label>
                <Input 
                  id="demo-input"
                  placeholder="Type something..." 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-textarea">Textarea</Label>
                <Textarea 
                  id="demo-textarea"
                  placeholder="Enter your message..."
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-4">
              <SearchInput
                placeholder="Search components..."
                value={searchTerm}
                onChange={setSearchTerm}
              />
              <FormField
                id="demo-select"
                label="Select Field"
                type="select"
                placeholder="Choose an option"
                options={[
                  { value: "option1", label: "Option 1" },
                  { value: "option2", label: "Option 2" },
                  { value: "option3", label: "Option 3" },
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table Demo */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Data Table Component</CardTitle>
              <CardDescription>Feature-rich table with sorting and actions</CardDescription>
            </div>
            <Badge variant="outline">
              {sampleTableData.length} components
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={sampleTableData}
            columns={tableColumns}
            actions={tableActions}
            emptyMessage="No components found"
          />
        </CardContent>
      </Card>

      {/* Interactive Components Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Components</CardTitle>
          <CardDescription>Dropdown menus, dialogs, and other interactive elements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Actions Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Component Dialog</DialogTitle>
                  <DialogDescription>
                    This is a sample dialog component with proper styling.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <p>Dialog content goes here. This component maintains consistent styling with the design system.</p>
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Currency Formatting Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Utility Functions</CardTitle>
          <CardDescription>Helper functions for formatting and data manipulation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Currency Formatting (Nepali/Indian Style)</h4>
              <div className="space-y-2 text-sm">
                <p>Small amount: <code className="bg-gray-100 px-1 rounded">{formatCurrency(150.50)}</code></p>
                <p>Large amount: <code className="bg-gray-100 px-1 rounded">{formatCurrency(125000.75)}</code></p>
                <p>Lakh format: <code className="bg-gray-100 px-1 rounded">{formatCurrency(1500000)}</code></p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Available Hooks</h4>
              <div className="space-y-1 text-sm">
                <p><code className="bg-gray-100 px-1 rounded">useLocalStorage</code> - Data persistence</p>
                <p><code className="bg-gray-100 px-1 rounded">useToast</code> - Notifications</p>
                <p><code className="bg-gray-100 px-1 rounded">useHydration</code> - SSR handling</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Sheet Demo */}
      <FormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        title="Test Form"
        description="This is a sample form using our form sheet component"
        onSubmit={handleFormSubmit}
      >
        <div className="space-y-6">
          <FormField
            id="name"
            label="Name"
            placeholder="Enter name"
            value={formData.name}
            onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
            required
          />
          <FormField
            id="description"
            label="Description"
            type="textarea"
            placeholder="Enter description"
            value={formData.description}
            onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
          />
          <FormField
            id="category"
            label="Category"
            type="select"
            placeholder="Select category"
            value={formData.category}
            onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            options={[
              { value: "ui", label: "UI Components" },
              { value: "form", label: "Form Components" },
              { value: "data", label: "Data Components" },
            ]}
          />
        </div>
      </FormSheet>
    </div>
  );

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

        {/* Navigation Tabs */}
        <NavTabs
          items={mainTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "overview" && renderOverviewContent()}
          {activeTab === "components" && renderComponentsContent()}
        </div>
      </div>
    </Layout>
  );
}
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
                <Button 
                  onClick={() => setActiveTab("components")}
                  className="w-full text-white" 
                  style={{ backgroundColor: '#D8550D' }}
                >
                  View Components
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
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