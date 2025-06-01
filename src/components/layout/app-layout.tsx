
"use client";

import type React from "react";
import { useState, useEffect } from 'react';
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
import { useAuth } from "@/context/auth-context"; // Import useAuth
import { useRouter } from "next/navigation"; // Import useRouter

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpenState, setSidebarOpenState] = useState(false);
  const { isAuthenticated, isLoading } = useAuth(); // Get auth state and loading status
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated and not loading.
    // The isLoading check prevents redirecting before auth status is determined.
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // If loading or not authenticated, don't render the main layout yet.
  // This prevents flashing the layout briefly before redirection.
  if (isLoading || !isAuthenticated) {
    return null; 
    // Or return a loading spinner for a better UX if isLoading is true
    // if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    // return null;
  }

  return (
    <SidebarProvider 
      open={sidebarOpenState} 
      onOpenChange={setSidebarOpenState}
      defaultOpen={false} // Keep this for initial collapsed state
    >
      <Sidebar collapsible="icon">
        <MainSidebar />
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
            <SidebarTrigger className="md:hidden" />
            <SidebarTrigger className="hidden md:flex" />
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
