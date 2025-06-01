
"use client";

import type { Metadata } from 'next'; // Keep for potential static metadata
import './globals.css';
import { AppLayout } from '@/components/layout/app-layout';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from '@/context/auth-context';
import { usePathname } from 'next/navigation';
import React from 'react'; // Import React for JSX

// export const metadata: Metadata = { // Static metadata can still be defined
//   title: 'FileFlow',
//   description: 'File Management Application by Firebase Studio',
// };


// SiteLayout component to conditionally render AppLayout
function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Optional: Render a global loading state or a blank page
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            {/* You can add a spinner or any loading indicator here */}
            <p>Loading application...</p>
        </div>
    );
  }

  if (pathname === '/login') {
    return <>{children}</>; // Login page does not use AppLayout
  }

  // For all other pages, AppLayout will handle its own auth check and redirection
  // or render content if authenticated.
  return <AppLayout>{children}</AppLayout>;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>FileFlow</title>
        <meta name="description" content="File Management Application by Firebase Studio" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <SiteLayout>{children}</SiteLayout>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
