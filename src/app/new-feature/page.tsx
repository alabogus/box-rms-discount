"use client";

import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { FormSheet } from "@/components/ui/form-sheet";
import { Sparkles, Plus, Save, Settings, Zap } from "lucide-react";

export default function NewFeaturePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });

  const handleFormSubmit = () => {
    console.log('Form submitted:', formData);
    setIsFormOpen(false);
    setFormData({ name: "", description: "", category: "" });
  };

  const formFields = [
    {
      id: "name",
      label: "Feature Name",
      type: "text" as const,
      placeholder: "Enter feature name...",
      required: true,
    },
    {
      id: "description", 
      label: "Description",
      type: "textarea" as const,
      placeholder: "Describe your feature...",
    },
    {
      id: "category",
      label: "Category",
      type: "select" as const,
      placeholder: "Select category",
      options: [
        { value: "ui", label: "UI Component" },
        { value: "feature", label: "Feature Module" },
        { value: "integration", label: "Integration" },
        { value: "utility", label: "Utility" },
      ],
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-orange-600" />
              New Feature
            </h1>
            <p className="text-gray-600 mt-1">Start building your next feature with this template</p>
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

        {/* Development Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5 text-yellow-600" />
                Quick Start
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Modify the page title and description</p>
                <p>• Add your feature-specific components</p>
                <p>• Customize the form fields as needed</p>
                <p>• Update the navigation in sidebar.tsx</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5 text-blue-600" />
                Available Components
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• FormField & FormSheet for forms</p>
                <p>• DataTable for data display</p>
                <p>• Cards, Buttons, Inputs</p>
                <p>• Toast notifications</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Save className="h-5 w-5 text-green-600" />
                Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Use TypeScript for type safety</p>
                <p>• Follow the existing design patterns</p>
                <p>• Add proper error handling</p>
                <p>• Keep components reusable</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Development Area */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Development Area</CardTitle>
            <CardDescription>
              Replace this section with your feature implementation. This template provides
              the basic structure with layout, forms, and styling already configured.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Sparkles className="h-16 w-16 text-orange-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-3">Ready to Build!</h3>
              <p className="text-gray-600 max-w-lg mx-auto mb-6">
                This page template includes all the essentials: layout structure, form handling,
                state management, and consistent styling. Start building your feature here.
              </p>
              <div className="space-x-4">
                <Button 
                  variant="outline"
                  onClick={() => setIsFormOpen(true)}
                >
                  Test Form
                </Button>
                <Button 
                  className="text-white"
                  style={{ backgroundColor: '#D8550D' }}
                >
                  Start Coding
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sample Form Implementation */}
        <FormSheet
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          title="Sample Form"
          description="This demonstrates the form pattern you can use in your features"
          onSubmit={handleFormSubmit}
        >
          <div className="space-y-6">
            {formFields.map((field) => (
              <FormField
                key={field.id}
                {...field}
                value={formData[field.id as keyof typeof formData]}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, [field.id]: value }))
                }
              />
            ))}
          </div>
        </FormSheet>
      </div>
    </Layout>
  );
}