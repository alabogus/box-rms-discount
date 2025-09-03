"use client";

import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NavTabs } from "@/components/ui/nav-item";
import { PageHeader } from "@/components/ui/page-header";
import { Plus, Edit, Trash2, PercentIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FormField } from "@/components/ui/form-field";
import { FormSheet } from "@/components/ui/form-sheet";
import { Switch } from "@/components/ui/switch";
import { Discount, DiscountLimit } from "@/types/discount";
import { StatusBadge } from "@/components/ui/status-badge";

export default function DiscountsPage() {
  const [activeTab, setActiveTab] = useState("preconfigured");
  const [discounts, setDiscounts] = useState<Discount[]>([
    { id: "1", name: "Small Discount", percentage: 5, description: "Small discount", isActive: true },
    { id: "2", name: "Popular Choice", percentage: 10, description: "Popular choice", isActive: true },
    { id: "3", name: "Special Offer", percentage: 15, description: "Special offer", isActive: true },
    { id: "4", name: "VIP Discount", percentage: 20, description: "For VIP customers", isActive: false }
  ]);
  
  const [discountRoleLimits, setDiscountRoleLimits] = useState<DiscountLimit[]>([
    { roleId: "1", roleName: "Waiter", maxPercentage: 25 },
    { roleId: "2", roleName: "Manager", maxPercentage: 50 },
    { roleId: "3", roleName: "Admin", maxPercentage: 100 }
  ]);
  
  const [isDiscountSheetOpen, setIsDiscountSheetOpen] = useState(false);
  const [isRoleLimitSheetOpen, setIsRoleLimitSheetOpen] = useState(false);
  const [currentDiscount, setCurrentDiscount] = useState<Discount | null>(null);
  const [currentRoleLimit, setCurrentRoleLimit] = useState<DiscountLimit | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Navigation tabs for discount types
  const discountTabs = [
    { id: "preconfigured", label: "Preconfigured" },
    { id: "role-based", label: "Role-Based Limits" },
    { id: "custom", label: "Custom Discounts" },
    { id: "loyalty", label: "Loyalty Programs" },
    { id: "seasonal", label: "Seasonal" },
  ];

  // Helper function to get current tab info
  const getCurrentTabInfo = () => {
    const currentTab = discountTabs.find(tab => tab.id === activeTab);
    
    // Define specific titles and descriptions for each discount tab
    const tabDetails: Record<string, { title: string; description: string }> = {
      preconfigured: {
        title: "Preconfigured Discounts",
        description: "Manage discounts that can be quickly applied by staff"
      },
      "role-based": {
        title: "Role-Based Discount Limits",
        description: "Set maximum discount percentages allowed for each staff role"
      },
      custom: {
        title: "Custom Discounts",
        description: "Configure settings for custom discount approvals"
      },
      loyalty: {
        title: "Loyalty Programs",
        description: "Manage customer loyalty discount programs"
      },
      seasonal: {
        title: "Seasonal Discounts",
        description: "Set up time-based promotional discounts"
      }
    };

    const details = tabDetails[activeTab] || {
      title: "Discounts",
      description: "Manage all discount configurations"
    };

    return {
      title: details.title,
      description: details.description
    };
  };

  const tabInfo = getCurrentTabInfo();

  const handleAddDiscount = () => {
    setCurrentDiscount({
      id: "",
      name: "",
      percentage: 0,
      description: "",
      isActive: true
    });
    setIsEditMode(false);
    setIsDiscountSheetOpen(true);
  };

  const handleEditDiscount = (discount: Discount) => {
    setCurrentDiscount({ ...discount });
    setIsEditMode(true);
    setIsDiscountSheetOpen(true);
  };

  const handleDeleteDiscount = (id: string) => {
    setDiscounts(discounts.filter(discount => discount.id !== id));
  };

  const handleDiscountSave = () => {
    if (!currentDiscount) return;

    if (isEditMode) {
      setDiscounts(discounts.map(discount => 
        discount.id === currentDiscount.id ? currentDiscount : discount
      ));
    } else {
      const newId = Math.max(...discounts.map(d => parseInt(d.id)), 0) + 1;
      setDiscounts([...discounts, { ...currentDiscount, id: newId.toString() }]);
    }

    setIsDiscountSheetOpen(false);
  };

  const handleEditRoleLimit = (roleLimit: DiscountLimit) => {
    setCurrentRoleLimit({ ...roleLimit });
    setIsRoleLimitSheetOpen(true);
  };

  const handleRoleLimitSave = () => {
    if (!currentRoleLimit) return;

    setDiscountRoleLimits(discountRoleLimits.map(limit => 
      limit.roleId === currentRoleLimit.roleId ? currentRoleLimit : limit
    ));

    setIsRoleLimitSheetOpen(false);
  };

  const renderPreconfiguredContent = () => (
    <div className="space-y-6">
      {/* Preconfigured Discounts Section */}
      <Card>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Percentage</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Description</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {discounts.map((discount) => (
                  <tr key={discount.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">{discount.name}</td>
                    <td className="p-4 align-middle">{discount.percentage}%</td>
                    <td className="p-4 align-middle">{discount.description}</td>
                    <td className="p-4 align-middle">
                      <StatusBadge status={discount.isActive ? "Active" : "Inactive"} />
                    </td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditDiscount(discount)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteDiscount(discount.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Tablet App Preview</CardTitle>
          <CardDescription>
            Preview how discounts will appear on tablet devices for waiters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-sm mx-auto border rounded-lg shadow-sm p-4 bg-gray-50">
            <div className="border-b pb-3 mb-3">
              <h3 className="text-lg font-medium">Apply Discount</h3>
              <p className="text-sm text-gray-500">Select a discount or create a custom one</p>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm font-medium">Preconfigured Discounts</p>
              {discounts
                .filter(d => d.isActive)
                .map(discount => (
                <div 
                  key={discount.id} 
                  className="flex justify-between items-center p-3 border rounded-md hover:bg-white cursor-pointer"
                >
                  <div>
                    <p className="font-medium">{discount.name}</p>
                    <p className="text-sm text-gray-500">{discount.description}</p>
                  </div>
                  <Badge variant="outline">{discount.percentage}% off</Badge>
                </div>
              ))}
              
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  className="w-full border-dashed border-orange-300 text-orange-600 flex items-center justify-center"
                >
                  <PercentIcon className="h-4 w-4 mr-2" />
                  Apply custom discount
                </Button>
              </div>
              
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Maximum allowed:</p>
                  <p className="text-sm font-medium">{discountRoleLimits.find(role => role.roleName === "Waiter")?.maxPercentage || 25}%</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">Based on your role as Waiter</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Discount Form Sheet */}
      <FormSheet
        open={isDiscountSheetOpen}
        onOpenChange={setIsDiscountSheetOpen}
        title={isEditMode ? "Edit Discount" : "Add New Discount"}
        description={isEditMode 
          ? "Update the discount details below" 
          : "Create a new preconfigured discount for your staff to use"}
        onSubmit={handleDiscountSave}
        submitLabel={isEditMode ? "Update" : "Create"}
      >
        <div className="space-y-6">
          <FormField
            id="discount-name"
            label="Name"
            placeholder="Enter discount name"
            value={currentDiscount?.name || ''}
            onChange={(value) => setCurrentDiscount(prev => prev ? {...prev, name: value} : null)}
            required
          />
          
          <FormField
            id="discount-percentage"
            label="Percentage"
            type="number"
            placeholder="Enter percentage"
            value={currentDiscount?.percentage?.toString() || '0'}
            onChange={(value) => setCurrentDiscount(prev => prev ? 
              {...prev, percentage: parseInt(value)} : null)}
            required
            className="max-w-[200px]"
          />
          
          <FormField
            id="discount-description"
            label="Description"
            type="textarea"
            placeholder="Enter description"
            value={currentDiscount?.description || ''}
            onChange={(value) => setCurrentDiscount(prev => prev ? 
              {...prev, description: value} : null)}
          />
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="discount-active"
              checked={currentDiscount?.isActive || false}
              onCheckedChange={(checked: boolean) => setCurrentDiscount(prev => prev ? 
                {...prev, isActive: checked} : null)}
            />
            <Label htmlFor="discount-active">
              {currentDiscount?.isActive ? "Active" : "Inactive"}
            </Label>
          </div>
        </div>
      </FormSheet>
    </div>
  );

  const renderRoleBasedContent = () => (
    <div className="space-y-6">
      {/* Role-Based Discount Limits Section */}
      <Card>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">Role</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Max Discount Percentage</th>
                  <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {discountRoleLimits.map((limit) => (
                  <tr key={limit.roleId} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">{limit.roleName}</td>
                    <td className="p-4 align-middle">{limit.maxPercentage}%</td>
                    <td className="p-4 align-middle text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditRoleLimit(limit)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Role Limit Form Sheet */}
      <FormSheet
        open={isRoleLimitSheetOpen}
        onOpenChange={setIsRoleLimitSheetOpen}
        title="Edit Role Discount Limit"
        description="Set the maximum discount percentage allowed for this role"
        onSubmit={handleRoleLimitSave}
        submitLabel="Update"
      >
        <div className="space-y-6">
          <FormField
            id="role-name"
            label="Role"
            value={currentRoleLimit?.roleName || ''}
            disabled
          />
          
          <FormField
            id="max-percentage"
            label="Max Percentage"
            type="number"
            placeholder="Enter maximum percentage"
            value={currentRoleLimit?.maxPercentage?.toString() || '0'}
            onChange={(value) => setCurrentRoleLimit(prev => prev ? 
              {...prev, maxPercentage: parseInt(value)} : null)}
            required
            className="max-w-[200px]"
          />
        </div>
      </FormSheet>
    </div>
  );

  const renderCustomContent = () => (
    <Card>
      <CardContent>
        <div className="text-center py-12">
          <p className="text-gray-500">Custom discount configuration will be implemented here</p>
        </div>
      </CardContent>
    </Card>
  );

  const renderLoyaltyContent = () => (
    <Card>
      <CardContent>
        <div className="text-center py-12">
          <p className="text-gray-500">Loyalty program discounts will be implemented here</p>
        </div>
      </CardContent>
    </Card>
  );

  const renderSeasonalContent = () => (
    <Card>
      <CardContent>
        <div className="text-center py-12">
          <p className="text-gray-500">Seasonal discount configuration will be implemented here</p>
        </div>
      </CardContent>
    </Card>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "preconfigured":
        return renderPreconfiguredContent();
      case "role-based":
        return renderRoleBasedContent();
      case "custom":
        return renderCustomContent();
      case "loyalty":
        return renderLoyaltyContent();
      case "seasonal":
        return renderSeasonalContent();
      default:
        return renderPreconfiguredContent();
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <NavTabs
          items={discountTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Page Header */}
        <PageHeader
          title={tabInfo.title}
          description={tabInfo.description}
        >
          <Button 
            className="text-white" 
            style={{ backgroundColor: '#D8550D' }}
            onClick={() => {
              if (activeTab === "preconfigured") {
                handleAddDiscount();
              } else if (activeTab === "role-based") {
                handleEditRoleLimit(discountRoleLimits[0]);
              } else {
                // Handle other add buttons based on active tab
              }
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add {activeTab === "preconfigured" ? "Discount" : 
                 activeTab === "role-based" ? "Role Limit" : 
                 "Configuration"}
          </Button>
        </PageHeader>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </Layout>
  );
}