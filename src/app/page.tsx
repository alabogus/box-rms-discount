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
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { formatCurrency, formatDate } from "@/lib/utils";
import { StockItem } from "@/types";
import {
  Package,
  Users,
  TrendingUp,
  DollarSign,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";

// Sample data
const sampleStockItems: StockItem[] = [
  {
    id: "1",
    name: "Basmati Rice",
    description: "Premium quality long grain rice",
    category: "Grains",
    quantity: 50,
    unit: "kg",
    reorderLevel: 10,
    price: 85.50,
    supplier: "ABC Suppliers",
    status: "Available",
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: "2",
    name: "Olive Oil",
    description: "Extra virgin olive oil",
    category: "Oils",
    quantity: 5,
    unit: "liters",
    reorderLevel: 8,
    price: 450.00,
    supplier: "Premium Foods",
    status: "Low Quantity",
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: "3",
    name: "Tomatoes",
    description: "Fresh red tomatoes",
    category: "Vegetables",
    quantity: 0,
    unit: "kg",
    reorderLevel: 5,
    price: 120.00,
    supplier: "Local Farm",
    status: "Out of Stock",
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-19'),
  },
];

export default function Dashboard() {
  const [stockItems, setStockItems] = useLocalStorage<StockItem[]>('stockItems', sampleStockItems);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    quantity: "",
    unit: "",
    price: "",
    supplier: "",
  });

  const tableColumns = [
    {
      key: 'name' as keyof StockItem,
      label: 'Item',
      render: (value: any, row: StockItem) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{row.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-gray-500">{row.description}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'category' as keyof StockItem,
      label: 'Category',
    },
    {
      key: 'quantity' as keyof StockItem,
      label: 'Quantity',
      render: (value: any, row: StockItem) => `${value} ${row.unit}`,
    },
    {
      key: 'price' as keyof StockItem,
      label: 'Price',
      render: (value: any) => formatCurrency(value),
    },
    {
      key: 'status' as keyof StockItem,
      label: 'Status',
      render: (value: any) => <StatusBadge status={value} />,
    },
  ];

  const tableActions = [
    {
      label: 'Edit',
      icon: Edit,
      onClick: (row: StockItem) => {
        console.log('Edit:', row.name);
      },
    },
    {
      label: 'Delete',
      icon: Trash2,
      variant: 'destructive' as const,
      onClick: (row: StockItem) => {
        console.log('Delete:', row.name);
      },
    },
  ];

  const handleFormSubmit = () => {
    console.log('Form submitted:', formData);
    setIsFormOpen(false);
    // Reset form
    setFormData({
      name: "",
      description: "",
      category: "",
      quantity: "",
      unit: "",
      price: "",
      supplier: "",
    });
  };

  const filteredItems = stockItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">RMS Dashboard</h1>
            <p className="text-gray-600 mt-1">Restaurant Management System - Design Prototype</p>
          </div>
          <Button 
            onClick={() => setIsFormOpen(true)}
            className="text-white"
            style={{ backgroundColor: '#D8550D' }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Items"
            value={stockItems.length}
            change={{ value: 12, type: 'increase', period: 'last month' }}
            icon={Package}
          />
          <MetricCard
            title="Low Stock Items"
            value={stockItems.filter(item => item.status === 'Low Quantity').length}
            change={{ value: 5, type: 'decrease', period: 'last week' }}
            icon={TrendingUp}
          />
          <MetricCard
            title="Total Value"
            value={formatCurrency(stockItems.reduce((sum, item) => sum + (item.price * item.quantity), 0))}
            change={{ value: 8, type: 'increase', period: 'last month' }}
            icon={DollarSign}
          />
          <MetricCard
            title="Active Suppliers"
            value="12"
            change={{ value: 2, type: 'increase', period: 'last quarter' }}
            icon={Users}
          />
        </div>

        {/* Inventory Management Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Inventory Items</CardTitle>
                <CardDescription>Manage your restaurant's stock items</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <SearchInput
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={setSearchTerm}
                  className="w-80"
                />
                <Badge variant="outline">
                  {filteredItems.length} items
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              data={filteredItems}
              columns={tableColumns}
              actions={tableActions}
              emptyMessage="No items found"
            />
          </CardContent>
        </Card>

        {/* Design System Showcase */}
        <Card>
          <CardHeader>
            <CardTitle>Design System Components</CardTitle>
            <CardDescription>Showcasing reusable components from your box-dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Status Badges */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Status Indicators</h3>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status="Available" />
                  <StatusBadge status="Low Quantity" />
                  <StatusBadge status="Out of Stock" />
                  <StatusBadge status="Pending" />
                  <StatusBadge status="Active" />
                  <StatusBadge status="Inactive" />
                </div>
              </div>

              {/* Currency Formatting */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Currency Formatting</h3>
                <div className="space-y-2">
                  <p>Small amount: {formatCurrency(150.50)}</p>
                  <p>Large amount: {formatCurrency(125000.75)}</p>
                  <p>Lakh format: {formatCurrency(1500000)}</p>
                </div>
              </div>

              {/* Form Patterns Demo */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Form Components</h3>
                <p className="text-gray-600 mb-4">Click "Add Item" to see the slide-out form pattern from your box-dashboard.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Sheet */}
        <FormSheet
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          title="Add New Stock Item"
          description="Add a new item to your restaurant inventory"
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        >
          <div className="space-y-6">
            <FormField
              id="name"
              label="Item Name"
              placeholder="Enter item name"
              value={formData.name}
              onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
              required
            />
            
            <FormField
              id="description"
              label="Description"
              type="textarea"
              placeholder="Enter item description"
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
                { value: "Grains", label: "Grains" },
                { value: "Vegetables", label: "Vegetables" },
                { value: "Oils", label: "Oils" },
                { value: "Spices", label: "Spices" },
              ]}
              required
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                id="quantity"
                label="Quantity"
                type="number"
                placeholder="0"
                value={formData.quantity}
                onChange={(value) => setFormData(prev => ({ ...prev, quantity: value }))}
                required
              />
              
              <FormField
                id="unit"
                label="Unit"
                type="select"
                placeholder="Select unit"
                value={formData.unit}
                onChange={(value) => setFormData(prev => ({ ...prev, unit: value }))}
                options={[
                  { value: "kg", label: "Kilograms" },
                  { value: "liters", label: "Liters" },
                  { value: "pieces", label: "Pieces" },
                  { value: "packets", label: "Packets" },
                ]}
                required
              />
            </div>
            
            <FormField
              id="price"
              label="Price per Unit"
              type="number"
              placeholder="0.00"
              value={formData.price}
              onChange={(value) => setFormData(prev => ({ ...prev, price: value }))}
              required
            />
            
            <FormField
              id="supplier"
              label="Supplier"
              placeholder="Enter supplier name"
              value={formData.supplier}
              onChange={(value) => setFormData(prev => ({ ...prev, supplier: value }))}
            />
          </div>
        </FormSheet>
      </div>
    </Layout>
  );
}
