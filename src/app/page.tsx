
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Users, FolderKanban, Settings } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const initialStatsData = [
  { label: "Total Files", value: "1.2K" },
  { label: "Active Users", value: "78" },
  { label: "Pending Approvals", value: "12" },
  { label: "Storage Used", value: "64 GB" },
];

export default function DashboardPage() {
  const [stats, setStats] = useState(initialStatsData.map(s => ({ ...s, value: '' })));
  const [isStatsLoading, setIsStatsLoading] = useState(true);

  useEffect(() => {
    setIsStatsLoading(true);
    const timer = setTimeout(() => {
      setStats(initialStatsData);
      setIsStatsLoading(false);
    }, 1500); // Simulate 1.5 second delay
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
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary">Welcome to FileFlow Dashboard!</CardTitle>
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
              icon={<FolderKanban className="h-8 w-8 text-accent" />}
              title="File Management"
              description="Organize, upload, and share your documents and media."
              link="/file-manager"
              imageSrc="/a1.jpg"
              imageAlt="File management illustration"
              aiHint="file organization"
            />
            <InfoCard
              icon={<Users className="h-8 w-8 text-accent" />}
              title="User & Role Management"
              description="Administer users, assign roles, and manage department structures."
              link="/user-management/users"
              imageSrc="/a2.jpg"
              imageAlt="User management illustration"
              aiHint="team collaboration"
            />
            <InfoCard
              icon={<BarChart className="h-8 w-8 text-accent" />}
              title="Template Management"
              description="Create and manage master templates for documents and approvals."
              link="/template-management/master-templates"
              imageSrc="/a3.jpg"
              imageAlt="Analytics illustration"
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
  imageSrc: string;
  imageAlt: string;
  aiHint?: string;
}

function InfoCard({ icon, title, description, link, imageSrc, imageAlt, aiHint }: InfoCardProps) {
  return (
    <Card className="hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {icon}
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image 
          src={imageSrc} 
          alt={imageAlt} 
          width={600} 
          height={400} 
          className="rounded-md mb-4 object-cover aspect-[3/2]" 
          data-ai-hint={aiHint || title.toLowerCase().replace(/\s+/g, ' ')}
        />
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <a href={link} className="text-sm font-semibold text-primary hover:underline">
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
        { bg: 'bg-[hsl(var(--chart-5))]', valueText: 'text-white', labelText: 'text-white/80' }, // Added a 5th option just in case
    ];
    const selectedColor = colorPalette[colorIndex % colorPalette.length];

    return (
        <div className={cn(
            "p-4 rounded-lg text-center h-24 flex flex-col justify-center shadow-md transition-colors duration-300",
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

