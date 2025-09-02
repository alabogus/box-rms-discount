"use client";

import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { FormSheet } from "@/components/ui/form-sheet";
import { SearchInput } from "@/components/ui/search-input";
import { StatusBadge } from "@/components/ui/status-badge";
import { DataTable } from "@/components/ui/data-table";
import { MetricCard } from "@/components/ui/metric-card";
import { Badge } from "@/components/ui/badge";
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
  Users,
  Edit,
  Trash2,
  Plus,
  Layers,
} from "lucide-react";

export default function ComponentsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });

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

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Component Library</h1>
            <p className="text-gray-600 mt-1">Reusable UI components from your box-dashboard design system</p>
          </div>
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
          title="Component Form Demo"
          description="Test the slide-out form pattern from your box-dashboard"
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        >
          <div className="space-y-6">
            <FormField
              id="name"
              label="Component Name"
              placeholder="Enter component name"
              value={formData.name}
              onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
              required
            />
            
            <FormField
              id="description"
              label="Description"
              type="textarea"
              placeholder="Describe the component"
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
                { value: "layout", label: "Layout" },
                { value: "form", label: "Form" },
                { value: "data", label: "Data Display" },
                { value: "interactive", label: "Interactive" },
              ]}
              required
            />
          </div>
        </FormSheet>
      </div>
    </Layout>
  );
}