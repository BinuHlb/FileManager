
"use client";

// Keep for potential static metadata, though not actively used if RootLayout is "use client" for other reasons.
// import type { Metadata } from 'next'; 
import './globals.css';
import { AppLayout } from '@/components/layout/app-layout';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from '@/context/auth-context';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'; // Import React for JSX
import { inter, quicksand } from './fonts'; // Import the configured Inter and Quicksand fonts

// SiteLayout component to conditionally render AppLayout
function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  
  // Used to manage sidebar open state for AppLayout
  const [sidebarOpenState, setSidebarOpenState] = useState(false);


  if (isLoading) {
    // Optional: Render a global loading state or a blank page
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <p>Loading application...</p>
        </div>
    );
  }

  if (pathname === '/login') {
    return <>{children}</>; // Login page does not use AppLayout
  }

  // For all other pages, AppLayout will handle its own auth check and redirection
  // or render content if authenticated.
  return <AppLayout sidebarOpen={sidebarOpenState} onSidebarOpenChange={setSidebarOpenState}>{children}</AppLayout>;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${quicksand.variable}`} suppressHydrationWarning>
      <head>
        <title>FileFlow</title>
        <meta name="description" content="File Management Application by Firebase Studio" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <SiteLayout>{children}</SiteLayout>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
