
"use client";

import type React from "react";
import { useState } from 'react'; // Import useState
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { MainSidebar } from "./main-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpenState, setSidebarOpenState] = useState(false); // Default to false (collapsed)

  return (
    <SidebarProvider 
      open={sidebarOpenState} 
      onOpenChange={setSidebarOpenState}
    >
      <Sidebar collapsible="icon">
        <MainSidebar />
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
            <SidebarTrigger className="md:hidden" /> {/* For mobile */}
            <SidebarTrigger className="hidden md:flex" /> {/* For desktop */}
            <div className="flex items-center gap-4 ml-auto">
              <ThemeToggle />
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
