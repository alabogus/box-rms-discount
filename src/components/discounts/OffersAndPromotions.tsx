"use client";

import { useState, useRef, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormSheet } from "@/components/ui/form-sheet";
import { FormField } from "@/components/ui/form-field";
import { StatusBadge } from "@/components/ui/status-badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { type DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Edit, MoreHorizontal, Plus, HelpCircle, ChevronDown, X, CalendarIcon, Trash2, Check } from "lucide-react";
import { Discount, DiscountLimit, DiscountSchedule, TimeSlot } from "@/types/discount";
import { ComplexSchedulingModal } from "./ComplexSchedulingModal";

interface OffersAndPromotionsProps {
  discounts: Discount[];
  setDiscounts: (discounts: Discount[]) => void;
}

export function OffersAndPromotions({ discounts, setDiscounts }: OffersAndPromotionsProps) {
  const [isDiscountSheetOpen, setIsDiscountSheetOpen] = useState(false);
  const [currentDiscount, setCurrentDiscount] = useState<Discount | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isComplexSchedulingOpen, setIsComplexSchedulingOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [discountToDelete, setDiscountToDelete] = useState<Discount | null>(null);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const roleDropdownRef = useRef<HTMLDivElement>(null);

  const handleAddDiscount = () => {
    setCurrentDiscount({
      id: "",
      name: "",
      percentage: 0,
      isActive: true,
      promoCode: "",
      maxAmount: undefined,
      allowedRoles: [],
      type: 'simple',
      validityPeriod: undefined,
      schedule: undefined
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

  const handleDeleteDiscountConfirm = (discount: Discount) => {
    setDiscountToDelete(discount);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (discountToDelete) {
      handleDeleteDiscount(discountToDelete.id);
      setIsDeleteDialogOpen(false);
      setDiscountToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setDiscountToDelete(null);
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

  return (
    <TooltipProvider>
      <div className="space-y-6">
      <PageHeader
        title="Offers and Promotions"
        description="Manage preconfigured discounts and promotional offers that can be quickly applied by staff"
      >
        <Button 
          className="text-white" 
          style={{ backgroundColor: '#D8550D' }}
          onClick={handleAddDiscount}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Offer
        </Button>
      </PageHeader>
      
      {/* Preconfigured Discounts Section */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Offer Name</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Promo Code</TableHead>
            <TableHead>Allowed Roles</TableHead>
            <TableHead>Valid Period</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {discounts.map((discount) => (
            <TableRow key={discount.id}>
              <TableCell className="font-medium">{discount.name}</TableCell>
              <TableCell>
                {discount.percentage}%
                {discount.maxAmount && (
                  <span className="text-muted-foreground text-sm ml-1">
                    (max ₹{discount.maxAmount})
                  </span>
                )}
              </TableCell>
              <TableCell>
                {discount.promoCode ? (
                  <code className="bg-muted px-2 py-1 rounded text-sm">{discount.promoCode}</code>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell>
                {discount.allowedRoles?.includes("all") 
                  ? "All roles" 
                  : discount.allowedRoles?.map(role => 
                      role.charAt(0).toUpperCase() + role.slice(1)
                    ).join(", ") || "All roles"}
              </TableCell>
              <TableCell>
                {discount.validityPeriod ? (
                  <div className="text-sm">
                    <div>{format(discount.validityPeriod.from, "MMM dd, yyyy")}</div>
                    <div className="text-muted-foreground">to {format(discount.validityPeriod.to, "MMM dd, yyyy")}</div>
                  </div>
                ) : discount.schedule?.daySchedules ? (
                  <div className="text-sm space-y-1">
                    <div className="font-medium text-blue-600">Scheduled</div>
                    {discount.schedule.daySchedules.filter(d => d.enabled).map((daySchedule) => (
                      <div key={daySchedule.dayOfWeek} className="text-xs text-muted-foreground">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][daySchedule.dayOfWeek]}: {
                          daySchedule.timeSlots.map(slot => `${slot.startTime}-${slot.endTime}`).join(', ')
                        }
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">No expiry</span>
                )}
              </TableCell>
              <TableCell>
                <StatusBadge status={discount.isActive ? "Active" : "Inactive"} />
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditDiscount(discount)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteDiscountConfirm(discount)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Discount Form Sheet */}
      <FormSheet
        open={isDiscountSheetOpen}
        onOpenChange={setIsDiscountSheetOpen}
        title={isEditMode ? "Edit Offer" : "Create an offer"}
        description={isEditMode 
          ? "Update the offer details below" 
          : "Create offers and manage who can use them."}
        onSubmit={handleDiscountSave}
        submitLabel={isEditMode ? "Update" : "Save offer"}
        cancelLabel="Add another"
      >
        <div className="space-y-6">
          <FormField
            id="discount-name"
            label="Offer name"
            placeholder='eg."Happy Hour Discount"'
            value={currentDiscount?.name || ''}
            onChange={(value) => setCurrentDiscount(prev => prev ? {...prev, name: value} : null)}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discount-percentage">Percentage (%) *</Label>
              <div className="relative">
                <Input
                  id="discount-percentage"
                  type="number"
                  placeholder="eg. 10"
                  value={currentDiscount?.percentage?.toString() || '0'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentDiscount(prev => prev ? 
                    {...prev, percentage: parseInt(e.target.value)} : null)}
                  required
                  className="pr-8 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                  %
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="discount-max-amount">Max amount (₹)</Label>
              <div className="relative">
                <Input
                  id="discount-max-amount"
                  type="number"
                  placeholder="eg. 100"
                  value={currentDiscount?.maxAmount?.toString() || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentDiscount(prev => prev ? 
                    {...prev, maxAmount: e.target.value ? parseInt(e.target.value) : undefined} : null)}
                  className="pr-10 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-full">Maximum discount amount that can be applied regardless of percentage</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="discount-promo-code">Promo code</Label>
            <div className="relative">
              <Input
                id="discount-promo-code"
                placeholder='eg."Happy10"'
                value={currentDiscount?.promoCode || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentDiscount(prev => prev ? 
                  {...prev, promoCode: e.target.value} : null)}
                className="pr-10"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-full">Optional promotional code that customers can use to apply this discount</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="discount-roles">Roles allowed *</Label>
            <div className="relative">
              <div className="min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 cursor-pointer"
                   onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}>
                <div className="flex flex-wrap gap-1 items-center">
                  {currentDiscount?.allowedRoles?.length ? (
                    currentDiscount.allowedRoles.map((role) => (
                      <span
                        key={role}
                        className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentDiscount(prev => prev ? {
                              ...prev,
                              allowedRoles: prev.allowedRoles?.filter(r => r !== role) || []
                            } : null);
                          }}
                          className="ml-1 rounded-sm hover:bg-secondary-foreground/20"
                        >
                          ×
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-muted-foreground">Select a role</span>
                  )}
                  <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>
              
              {isRoleDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-popover text-popover-foreground rounded-md border shadow-md">
                  <div className="p-1">
                    {[
                      { value: "all", label: "All roles" },
                      { value: "manager", label: "Manager" },
                      { value: "cashier", label: "Cashier" },
                      { value: "supervisor", label: "Supervisor" },
                      { value: "admin", label: "Admin" }
                    ].map((role) => (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => {
                          if (role.value === "all") {
                            const hasAllRoles = currentDiscount?.allowedRoles?.includes("all");
                            if (hasAllRoles) {
                              setCurrentDiscount(prev => prev ? {
                                ...prev,
                                allowedRoles: []
                              } : null);
                            } else {
                              setCurrentDiscount(prev => prev ? {
                                ...prev,
                                allowedRoles: ["all"]
                              } : null);
                            }
                          } else {
                            const isSelected = currentDiscount?.allowedRoles?.includes(role.value);
                            const hasAllRoles = currentDiscount?.allowedRoles?.includes("all");
                            
                            if (hasAllRoles) {
                              // If "all" is selected, replace it with individual roles except the clicked one
                              const otherRoles = ["manager", "cashier", "supervisor", "admin"].filter(r => r !== role.value);
                              setCurrentDiscount(prev => prev ? {
                                ...prev,
                                allowedRoles: otherRoles
                              } : null);
                            } else if (isSelected) {
                              setCurrentDiscount(prev => prev ? {
                                ...prev,
                                allowedRoles: prev.allowedRoles?.filter(r => r !== role.value) || []
                              } : null);
                            } else {
                              const newRoles = [...(currentDiscount?.allowedRoles || []), role.value];
                              // Check if all individual roles are now selected
                              const individualRoles = ["manager", "cashier", "supervisor", "admin"];
                              const hasAllIndividualRoles = individualRoles.every(r => newRoles.includes(r));
                              
                              if (hasAllIndividualRoles) {
                                setCurrentDiscount(prev => prev ? {
                                  ...prev,
                                  allowedRoles: ["all"]
                                } : null);
                              } else {
                                setCurrentDiscount(prev => prev ? {
                                  ...prev,
                                  allowedRoles: newRoles
                                } : null);
                              }
                            }
                          }
                        }}
                        className="w-full text-left px-2 py-1.5 text-sm focus:bg-accent focus:text-accent-foreground rounded-sm hover:bg-accent hover:text-accent-foreground flex items-center justify-between"
                      >
                        <span>{role.label}</span>
                        {currentDiscount?.allowedRoles?.includes(role.value) && (
                          <Check className="h-4 w-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">Only the selected user roles will be able to use this offer</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="discount-type">Discount Type</Label>
              <select
                id="discount-type"
                value={currentDiscount?.type || 'simple'}
                onChange={(e) => {
                  const type = e.target.value as 'simple' | 'event' | 'complex';
                  setCurrentDiscount(prev => prev ? {
                    ...prev,
                    type,
                    validityPeriod: type === 'event' ? {
                      from: new Date(),
                      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    } : undefined,
                    schedule: type === 'complex' ? {
                      type: 'recurring',
                      daySchedules: [{
                        dayOfWeek: 1,
                        enabled: true,
                        timeSlots: [{
                          id: '1',
                          startTime: '07:00',
                          endTime: '10:00'
                        }]
                      }]
                    } : undefined
                  } : null)
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="simple">Simple (Runs forever)</option>
                <option value="event">Event (Date range)</option>
                <option value="complex">Complex (Advanced scheduling)</option>
              </select>
              <p className="text-xs text-muted-foreground">
                {currentDiscount?.type === 'simple' && "Discount will be active permanently"}
                {currentDiscount?.type === 'event' && "Discount will be active for a specific date range"}
                {currentDiscount?.type === 'complex' && "Discount will be active on specific days and times"}
              </p>
            </div>
            
            {currentDiscount?.type === 'event' && (
              <div className="space-y-2 pl-6 border-l-2 border-gray-100">
                <Label htmlFor="discount-validity">Date range</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="discount-validity"
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>
                        {currentDiscount.validityPeriod ? 
                          `${format(currentDiscount.validityPeriod.from, "MMM dd, yyyy")} - ${format(currentDiscount.validityPeriod.to, "MMM dd, yyyy")}` :
                          "Select date range"
                        }
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={currentDiscount.validityPeriod ? {
                        from: currentDiscount.validityPeriod.from,
                        to: currentDiscount.validityPeriod.to
                      } : undefined}
                      onSelect={(dateRange: DateRange | undefined) => {
                        setCurrentDiscount(prev => prev ? {
                          ...prev,
                          validityPeriod: dateRange && dateRange.from && dateRange.to ? {
                            from: dateRange.from,
                            to: dateRange.to
                          } : undefined
                        } : null)
                      }}
                      numberOfMonths={2}
                      className="rounded-lg"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
            
            {currentDiscount?.type === 'complex' && (
              <div className="space-y-2 pl-6 border-l-2 border-blue-100">
                <Label>Advanced Scheduling</Label>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsComplexSchedulingOpen(true)}
                  className="w-full justify-start"
                >
                  {currentDiscount.schedule?.daySchedules?.length ? 
                    `${currentDiscount.schedule.daySchedules.filter(d => d.enabled).length} day(s) configured` :
                    "Configure scheduling"
                  }
                </Button>
                {currentDiscount.schedule?.daySchedules?.length && (
                  <div className="text-xs text-muted-foreground space-y-1">
                    {currentDiscount.schedule.daySchedules.filter(d => d.enabled).map((daySchedule) => (
                      <div key={daySchedule.dayOfWeek}>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][daySchedule.dayOfWeek]}: {
                          daySchedule.timeSlots.map(slot => `${slot.startTime}-${slot.endTime}`).join(', ')
                        }
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
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

      {/* Complex Scheduling Modal */}
      <ComplexSchedulingModal
        open={isComplexSchedulingOpen}
        onOpenChange={setIsComplexSchedulingOpen}
        daySchedules={currentDiscount?.schedule?.daySchedules || []}
        onSave={(daySchedules) => {
          setCurrentDiscount(prev => prev ? {
            ...prev,
            schedule: {
              type: 'recurring',
              daySchedules
            }
          } : null)
        }}
      />
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete offer?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the offer "{discountToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </TooltipProvider>
  );
}