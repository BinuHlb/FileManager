
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Users, FolderKanban, Settings } from 'lucide-react';
// Removed Image import as we are using SVGs now
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const initialStatsData = [
  { label: "Total Files", value: "1.2K" },
  { label: "Active Users", value: "78" },
  { label: "Pending Approvals", value: "12" },
  { label: "Storage Used", value: "64 GB" },
];

// SVG Components
const FileManagementSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 75" className="w-auto h-full max-h-32 md:max-h-36 text-primary">
    <defs>
      <linearGradient id="gradFile" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.6 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.4 }} />
      </linearGradient>
    </defs>
    <path d="M10 15 H40 L48 23 H90 V60 H10 Z" fill="url(#gradFile)" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M15 30 H85 M15 40 H75 M15 50 H65" stroke="currentColor" strokeWidth="2" strokeOpacity="0.7" strokeLinecap="round"/>
  </svg>
);

const UserManagementSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 75" className="w-auto h-full max-h-32 md:max-h-36">
    <g className="text-accent">
      <circle cx="30" cy="28" r="10" fill="currentColor" strokeWidth="2" style={{stroke: 'hsl(var(--accent-foreground))'}} opacity="0.9"/>
      <path d="M15 60 C15 42 45 42 45 60 Z" fill="currentColor" strokeWidth="2" style={{stroke: 'hsl(var(--accent-foreground))'}} opacity="0.9"/>
    </g>
    <g className="opacity-70" style={{color: 'hsl(var(--muted-foreground))'}}>
      <circle cx="70" cy="28" r="9" fill="currentColor" strokeWidth="2" style={{stroke: 'hsl(var(--foreground))'}} />
      <path d="M56 60 C56 45 84 45 84 60 Z" fill="currentColor" strokeWidth="2" style={{stroke: 'hsl(var(--foreground))'}} />
    </g>
     <line x1="48" y1="35" x2="52" y2="35" style={{stroke: 'hsl(var(--border))'}} strokeWidth="2.5"/>
     <line x1="50" y1="33" x2="50" y2="37" style={{stroke: 'hsl(var(--border))'}} strokeWidth="2.5"/>
  </svg>
);

const TemplateManagementSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 75" className="w-auto h-full max-h-32 md:max-h-36">
    <rect x="15" y="12" width="70" height="50" rx="5" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2.5"/>
    <g style={{stroke: 'hsl(var(--muted-foreground))'}} strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round">
      <path d="M25 25 H75" />
      <path d="M25 35 H75" />
      <path d="M25 45 H60" />
      <path d="M25 55 H50" />
    </g>
    <g className="text-primary">
      <circle cx="72" cy="52" r="9" fill="currentColor" opacity="0.8" stroke="currentColor" strokeWidth="2"/>
      <path d="M72 43 L72 45 M72 61 L72 59 M63 52 L65 52 M81 52 L79 52 M65.7 45.7 L67.1 47.1 M78.9 56.9 L77.5 55.5 M65.7 56.9 L67.1 55.5 M78.9 45.7 L77.5 47.1" 
            style={{stroke: 'hsl(var(--primary-foreground))'}} strokeWidth="2" strokeLinecap="round"/>
    </g>
  </svg>
);


export default function DashboardPage() {
  const [stats, setStats] = useState(initialStatsData.map(s => ({ ...s, value: '' })));
  const [isStatsLoading, setIsStatsLoading] = useState(true);

  useEffect(() => {
    setIsStatsLoading(true);
    const timer = setTimeout(() => {
      setStats(initialStatsData);
      setIsStatsLoading(false);
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-6">
       <Card>
        <CardHeader>
            <CardTitle className="text-xl font-headline">Quick Stats</CardTitle>
            <CardDescription>A snapshot of your current activity.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <StatItem 
                key={index} 
                label={stat.label} 
                value={stat.value} 
                isLoading={isStatsLoading}
                colorIndex={index}
              />
            ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Welcome to FileFlow Dashboard!</CardTitle>
          <CardDescription className="text-lg">
            Your central hub for managing files, users, and system settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">
            Navigate through different modules using the sidebar. Here's a quick overview of what you can do:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard
              icon={<FolderKanban className="h-8 w-8 text-primary" />}
              title="File Management"
              description="Organize, upload, and share your documents and media."
              link="/file-manager"
              svgContent={<FileManagementSvg />}
              aiHint="file organization"
            />
            <InfoCard
              icon={<Users className="h-8 w-8 text-primary" />}
              title="User & Role Management"
              description="Administer users, assign roles, and manage department structures."
              link="/user-management/users"
              svgContent={<UserManagementSvg />}
              aiHint="team collaboration"
            />
            <InfoCard
              icon={<BarChart className="h-8 w-8 text-primary" />}
              title="Template Management"
              description="Create and manage master templates for documents and approvals."
              link="/template-management/master-templates"
              svgContent={<TemplateManagementSvg />}
              aiHint="document templates"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  svgContent?: React.ReactNode;
  aiHint?: string;
}

function InfoCard({ icon, title, description, link, svgContent, aiHint }: InfoCardProps) {
  return (
    <Card className="hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {icon}
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        {svgContent ? (
          <div 
            className="rounded-md mb-4 aspect-[3/2] flex items-center justify-center bg-muted/30 dark:bg-muted/10 p-3 sm:p-4 overflow-hidden" 
            data-ai-hint={aiHint || title.toLowerCase().replace(/\s+/g, ' ')}
          >
            {svgContent}
          </div>
        ) : (
          <div 
            className="rounded-md mb-4 aspect-[3/2] flex items-center justify-center bg-muted p-4" 
            data-ai-hint={aiHint || title.toLowerCase().replace(/\s+/g, ' ')}
          >
            <p className="text-muted-foreground text-sm">Illustration</p>
          </div>
        )}
        <p className="text-sm text-muted-foreground mb-4 flex-grow">{description}</p>
        <a href={link} className="text-sm font-semibold text-primary hover:underline mt-auto">
          Go to {title} &rarr;
        </a>
      </CardContent>
    </Card>
  );
}

interface StatItemProps {
    label: string;
    value: string;
    isLoading?: boolean;
    colorIndex: number;
}

function StatItem({ label, value, isLoading, colorIndex }: StatItemProps) {
    const colorPalette = [
        { bg: 'bg-[hsl(var(--chart-1))]', valueText: 'text-white', labelText: 'text-white/80' },
        { bg: 'bg-[hsl(var(--chart-2))]', valueText: 'text-white', labelText: 'text-white/80' },
        { bg: 'bg-[hsl(var(--chart-3))]', valueText: 'text-white', labelText: 'text-white/80' },
        { bg: 'bg-[hsl(var(--chart-4))]', valueText: 'text-neutral-800 dark:text-white', labelText: 'text-neutral-700 dark:text-white/80' },
        { bg: 'bg-[hsl(var(--chart-5))]', valueText: 'text-white', labelText: 'text-white/80' },
    ];
    const selectedColor = colorPalette[colorIndex % colorPalette.length];

    return (
        <div className={cn(
            "p-4 rounded-lg text-center h-24 flex flex-col justify-center transition-colors duration-300",
            isLoading ? "bg-secondary/30" : selectedColor.bg
        )}>
            {isLoading ? (
                <>
                    <Skeleton className="h-7 w-1/2 mx-auto mb-2 bg-background/50" />
                    <Skeleton className="h-4 w-3/4 mx-auto bg-background/40" />
                </>
            ) : (
                <>
                    <p className={cn("text-2xl font-bold", selectedColor.valueText)}>{value}</p>
                    <p className={cn("text-sm", selectedColor.labelText)}>{label}</p>
                </>
            )}
        </div>
    );
}

    