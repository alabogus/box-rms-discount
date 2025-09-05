"use client";

import { useState } from "react";
import { Layout } from "@/components/layout";
import { NavTabs } from "@/components/ui/nav-item";
import { Discount, DiscountLimit } from "@/types/discount";
import { OffersAndPromotions } from "@/components/discounts/OffersAndPromotions";
import { CustomDiscounts } from "@/components/discounts/CustomDiscounts";

export default function DiscountsPage() {
  const [activeTab, setActiveTab] = useState("offers");
  const [discounts, setDiscounts] = useState<Discount[]>([
    { 
      id: "1", 
      name: "Small Discount", 
      percentage: 5, 
      isActive: true,
      promoCode: "",
      maxAmount: undefined,
      allowedRoles: [],
      type: 'simple',
      validityPeriod: undefined
    },
    { 
      id: "2", 
      name: "Popular Choice", 
      percentage: 10, 
      isActive: true,
      promoCode: "",
      maxAmount: undefined,
      allowedRoles: [],
      type: 'simple',
      validityPeriod: undefined
    },
    { 
      id: "3", 
      name: "Special Offer", 
      percentage: 15, 
      isActive: true,
      promoCode: "",
      maxAmount: undefined,
      allowedRoles: [],
      type: 'simple',
      validityPeriod: undefined
    },
    { 
      id: "4", 
      name: "VIP Discount", 
      percentage: 20, 
      isActive: false,
      promoCode: "",
      maxAmount: undefined,
      allowedRoles: [],
      type: 'simple',
      validityPeriod: undefined
    }
  ]);
  
  const [discountRoleLimits, setDiscountRoleLimits] = useState<DiscountLimit[]>([
    { roleId: "1", roleName: "waiter", maxPercentage: 25, maxAmount: 50, dailyLimit: 10 },
    { roleId: "2", roleName: "manager", maxPercentage: 50, maxAmount: 100, dailyLimit: 20 },
    { roleId: "3", roleName: "admin", maxPercentage: 100, maxAmount: 500, dailyLimit: undefined }
  ]);

  // Navigation tabs for discount types
  const discountTabs = [
    { id: "offers", label: "Offers and Promotions" },
    { id: "custom", label: "Custom Discounts" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "offers":
        return <OffersAndPromotions discounts={discounts} setDiscounts={setDiscounts} />;
      case "custom":
        return <CustomDiscounts discountRoleLimits={discountRoleLimits} setDiscountRoleLimits={setDiscountRoleLimits} />;
      default:
        return <OffersAndPromotions discounts={discounts} setDiscounts={setDiscounts} />;
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

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </Layout>
  );
}