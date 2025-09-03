"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";
import { layout } from "@/lib/design-system";
import { Menu } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  hasTopNav?: boolean;
}

export function Layout({ children, className, hasTopNav = false }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
        className="hidden lg:flex"
      />

      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-4 left-4 z-40 h-10 w-10 p-0 bg-white shadow-md"
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Main Content */}
      <div 
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        )}
      >
        {/* Page Content */}
        <main 
          className={cn(
            "flex-1 overflow-auto",
            hasTopNav ? layout.content.paddingWithNav : layout.content.padding,
            className
          )}
        >
          <div className={layout.content.maxWidth}>
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={toggleMobileSidebar}
          />
          <Sidebar 
            collapsed={false}
            onToggle={toggleSidebar}
            className="relative z-10"
          />
        </div>
      )}
    </div>
  );
}