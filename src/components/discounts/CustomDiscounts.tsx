"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormSheet } from "@/components/ui/form-sheet";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PageHeader } from "@/components/ui/page-header";
import { Edit, MoreHorizontal, Plus, HelpCircle } from "lucide-react";
import { DiscountLimit } from "@/types/discount";

interface CustomDiscountsProps {
  discountRoleLimits: DiscountLimit[];
  setDiscountRoleLimits: (limits: DiscountLimit[]) => void;
}

export function CustomDiscounts({ discountRoleLimits, setDiscountRoleLimits }: CustomDiscountsProps) {
  const [isRoleLimitSheetOpen, setIsRoleLimitSheetOpen] = useState(false);
  const [currentRoleLimit, setCurrentRoleLimit] = useState<DiscountLimit | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleAddRoleLimit = () => {
    // For now, we'll just open the edit dialog with a new empty role
    setCurrentRoleLimit({
      roleId: "",
      roleName: "",
      maxPercentage: 0,
      maxAmount: 0,
      dailyLimit: undefined
    });
    setIsEditMode(false);
    setIsRoleLimitSheetOpen(true);
  };

  const handleEditRoleLimit = (roleLimit: DiscountLimit) => {
    setCurrentRoleLimit({ ...roleLimit });
    setIsEditMode(true);
    setIsRoleLimitSheetOpen(true);
  };

  const handleRoleLimitSave = () => {
    if (!currentRoleLimit) return;

    if (currentRoleLimit.roleId) {
      // Update existing role limit
      setDiscountRoleLimits(discountRoleLimits.map(limit => 
        limit.roleId === currentRoleLimit.roleId ? currentRoleLimit : limit
      ));
    } else {
      // Add new role limit or update existing one
      const existingRoleIndex = discountRoleLimits.findIndex(limit => limit.roleName === currentRoleLimit.roleName);
      if (existingRoleIndex !== -1) {
        // Update existing role
        const updatedLimits = [...discountRoleLimits];
        updatedLimits[existingRoleIndex] = { ...currentRoleLimit, roleId: updatedLimits[existingRoleIndex].roleId };
        setDiscountRoleLimits(updatedLimits);
      } else {
        // Add new role limit
        const newId = Math.max(...discountRoleLimits.map(d => parseInt(d.roleId)), 0) + 1;
        setDiscountRoleLimits([...discountRoleLimits, { ...currentRoleLimit, roleId: newId.toString() }]);
      }
    }

    setIsRoleLimitSheetOpen(false);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
      <PageHeader
        title="Custom Discounts"
        description="Set maximum discount percentages or fixed amounts allowed for each staff role when applying custom discounts"
      >
        <Button 
          className="text-white" 
          style={{ backgroundColor: '#D8550D' }}
          onClick={handleAddRoleLimit}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Role Limit
        </Button>
      </PageHeader>
      
      {/* Role-Based Discount Limits Section */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role</TableHead>
            <TableHead>Max Percentage</TableHead>
            <TableHead>Max Amount</TableHead>
            <TableHead>Daily Limit</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {discountRoleLimits.map((limit) => (
            <TableRow key={limit.roleId}>
              <TableCell className="font-medium">{limit.roleName.charAt(0).toUpperCase() + limit.roleName.slice(1)}</TableCell>
              <TableCell>{limit.maxPercentage}%</TableCell>
              <TableCell>₹{limit.maxAmount}</TableCell>
              <TableCell>
                {limit.dailyLimit ? (
                  <span>{limit.dailyLimit} uses/day</span>
                ) : (
                  <span className="text-muted-foreground">Unlimited</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditRoleLimit(limit)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Role Limit Form Sheet */}
      <FormSheet
        open={isRoleLimitSheetOpen}
        onOpenChange={setIsRoleLimitSheetOpen}
        title="Set custom discount limits"
        description="Define the maximum discount each staff role can apply. The system will always apply whichever is lower: percentage or fixed amount."
        onSubmit={handleRoleLimitSave}
        submitLabel="Save discount limit"
        cancelLabel="Add another"
      >
        <div className="space-y-6">
          <FormField
            id="role-name"
            label="User role"
            type="select"
            placeholder="Select a role"
            value={currentRoleLimit?.roleName || ''}
            onChange={(value) => {
              // Check if role already exists and auto-populate with existing values
              const existingRole = discountRoleLimits.find(limit => limit.roleName === value);
              if (existingRole && !isEditMode) {
                setCurrentRoleLimit({
                  ...existingRole
                });
              } else {
                setCurrentRoleLimit(prev => prev ? 
                  {...prev, roleName: value} : null);
              }
            }}
            options={[
              { value: "waiter", label: "Waiter" },
              { value: "manager", label: "Manager" },
              { value: "cashier", label: "Cashier" },
              { value: "supervisor", label: "Supervisor" },
              { value: "admin", label: "Admin" }
            ]}
            required
            disabled={isEditMode}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="max-percentage">Max Percentage (%) *</Label>
              <div className="relative">
                <Input
                  id="max-percentage"
                  type="number"
                  placeholder="eg. 10"
                  value={currentRoleLimit?.maxPercentage?.toString() || '0'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentRoleLimit(prev => prev ? 
                    {...prev, maxPercentage: parseInt(e.target.value)} : null)}
                  required
                  className="pr-8 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                  %
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="max-amount">Max amount (₹)</Label>
              <Input
                id="max-amount"
                type="number"
                placeholder="eg. 100"
                value={currentRoleLimit?.maxAmount?.toString() || '0'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentRoleLimit(prev => prev ? 
                  {...prev, maxAmount: parseInt(e.target.value)} : null)}
                className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="daily-limit">Daily limit</Label>
            <div className="relative max-w-[200px]">
              <Input
                id="daily-limit"
                type="number"
                placeholder="eg. 10"
                value={currentRoleLimit?.dailyLimit?.toString() || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentRoleLimit(prev => prev ? 
                  {...prev, dailyLimit: e.target.value ? parseInt(e.target.value) : undefined} : null)}
                className="pr-10 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[320px]">
                  <p className="w-full">Maximum number of times this discount can be used per day</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </FormSheet>
      </div>
    </TooltipProvider>
  );
}