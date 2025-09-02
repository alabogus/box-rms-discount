"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { layout } from "@/lib/design-system";
import { Menu } from "lucide-react";

interface HeaderProps {
  onMenuToggle?: () => void;
  className?: string;
}

export function Header({ onMenuToggle, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "bg-white border-b border-gray-200 flex items-center justify-between",
        layout.header.height,
        layout.header.padding,
        className
      )}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {onMenuToggle && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden h-8 w-8 p-0"
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Right Section - Empty for now since notifications and profile moved to sidebar */}
      <div className="flex items-center gap-4">
        {/* Additional header content can be added here if needed */}
      </div>
    </header>
  );
}