
"use client";

import type React from "react";
import { useEffect } from 'react'; // Removed useState as it's passed from RootLayout
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
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

interface AppLayoutProps {
  children: React.ReactNode;
  sidebarOpen: boolean;
  onSidebarOpenChange: (open: boolean) => void;
}

export function AppLayout({ children, sidebarOpen, onSidebarOpenChange }: AppLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    // Render nothing or a minimal loading indicator while checking auth / redirecting
    return null; 
  }

  return (
    <SidebarProvider 
      open={sidebarOpen} 
      onOpenChange={onSidebarOpenChange}
      defaultOpen={false} // Maintained for consistency, actual state controlled by `open` prop
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
