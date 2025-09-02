"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/providers/toast-provider";
import { layout } from "@/lib/design-system";
import {
  Settings,
  ChevronLeft,
  ChevronRight,
  Layers,
  Bell,
  User,
  LogOut,
  BookOpen,
  Sparkles,
  Home,
  FileText,
  Package2,
  Grid3X3,
  Users,
  Clock,
  TrendingUp,
  Activity,
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  disabled?: boolean;
}

const navigationItems: NavigationItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/home",
    icon: Home,
    disabled: true,
  },
  {
    id: "components",
    label: "Components",
    href: "/components",
    icon: Layers,
    badge: "NEW",
  },
  {
    id: "new-feature",
    label: "New Feature",
    href: "/",
    icon: Sparkles,
    badge: "NEW",
  },
  {
    id: "menu-manager",
    label: "Menu manager",
    href: "/menu-manager",
    icon: FileText,
    disabled: true,
  },
  {
    id: "inventory",
    label: "Inventory",
    href: "/inventory",
    icon: Package2,
    disabled: true,
  },
  {
    id: "areas-tables",
    label: "Areas and Tables",
    href: "/areas-tables",
    icon: Grid3X3,
    disabled: true,
  },
  {
    id: "members",
    label: "Members",
    href: "/members",
    icon: Users,
    disabled: true,
  },
  {
    id: "order-history",
    label: "Order history",
    href: "/order-history",
    icon: Clock,
    disabled: true,
  },
  {
    id: "sales",
    label: "Sales",
    href: "/sales",
    icon: TrendingUp,
    disabled: true,
  },
  {
    id: "activity",
    label: "Activity",
    href: "/activity",
    icon: Activity,
    disabled: true,
  },
  {
    id: "getting-started",
    label: "Getting Started",
    href: "/getting-started",
    icon: BookOpen,
    badge: "NEW",
  },
];

export function Sidebar({ collapsed = false, onToggle, className }: SidebarProps) {
  const pathname = usePathname();
  const { addToast } = useToast();

  const handleDisabledClick = (itemLabel: string) => {
    addToast({
      type: 'warning',
      title: 'Feature Coming Soon',
      description: `${itemLabel} is not available in this prototype. This feature will be implemented in the full version.`,
    });
  };

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300 h-screen fixed left-0 top-0 z-40",
        collapsed ? layout.sidebar.collapsed : layout.sidebar.width,
        className
      )}
    >
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center">
            <Image
              src="/box-logo.svg"
              alt="Box Logo"
              width={120}
              height={40}
              className="h-6 w-auto"
            />
          </div>
        )}
        {onToggle && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {!collapsed && <Separator />}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const isDisabled = item.disabled;

          if (isDisabled) {
            return (
              <div key={item.id}>
                <Button
                  variant={"ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10",
                    collapsed && "justify-center px-2"
                  )}
                  onClick={() => handleDisabledClick(item.label)}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-medium">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Button>
              </div>
            );
          }

          return (
            <Link key={item.id} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-10",
                  isActive && "bg-orange-50 text-orange-700 hover:bg-orange-50",
                  collapsed && "justify-center px-2"
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-medium">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <>
          <Separator />
          {/* System Section */}
          <div className="p-4 space-y-2">
            {/* Settings */}
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-10"
              onClick={() => handleDisabledClick('Settings')}
            >
              <Settings className="h-4 w-4 flex-shrink-0" />
              <span className="flex-1 text-left">Settings</span>
            </Button>
            
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-3 h-10 relative">
                  <Bell className="h-4 w-4 flex-shrink-0" />
                  <span className="flex-1 text-left">Notifications</span>
                  <Badge
                    variant="destructive"
                    className="h-4 w-4 p-0 text-xs flex items-center justify-center"
                  >
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="right" className="w-80 ml-4">
                <DropdownMenuLabel>System Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="space-y-2 p-2">
                  <div className="p-2 rounded-lg bg-orange-50 border border-orange-200">
                    <p className="text-sm font-medium text-orange-800">Low Stock Alert</p>
                    <p className="text-xs text-orange-600">Rice quantity is below reorder level</p>
                  </div>
                  <div className="p-2 rounded-lg bg-green-50 border border-green-200">
                    <p className="text-sm font-medium text-green-800">Order Received</p>
                    <p className="text-xs text-green-600">New order from Supplier ABC</p>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-sm font-medium text-blue-800">System Update</p>
                    <p className="text-xs text-blue-600">New features available</p>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Separator />
          
          {/* User Profile */}
          <div className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-3 h-12 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start flex-1">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">john@restaurant.com</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="right" className="w-56 ml-4">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          

        </>
      )}
      
      {/* Collapsed Footer */}
      {collapsed && (
        <>
          <Separator />
          <div className="p-2 space-y-2">
            {/* Settings - Collapsed */}
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => handleDisabledClick('Settings')}
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
            
            {/* Notifications - Collapsed */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 relative" title="Notifications">
                  <Bell className="h-4 w-4" />
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center"
                  >
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="right" className="w-80 ml-4">
                <DropdownMenuLabel>System Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="space-y-2 p-2">
                  <div className="p-2 rounded-lg bg-orange-50 border border-orange-200">
                    <p className="text-sm font-medium text-orange-800">Low Stock Alert</p>
                    <p className="text-xs text-orange-600">Rice quantity is below reorder level</p>
                  </div>
                  <div className="p-2 rounded-lg bg-green-50 border border-green-200">
                    <p className="text-sm font-medium text-green-800">Order Received</p>
                    <p className="text-xs text-green-600">New order from Supplier ABC</p>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-sm font-medium text-blue-800">System Update</p>
                    <p className="text-xs text-blue-600">New features available</p>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Separator />
          
          <div className="p-2">
            {/* User Profile - Collapsed */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0" title="Profile">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback className="text-xs">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="right" className="w-56 ml-4">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </div>
  );
}