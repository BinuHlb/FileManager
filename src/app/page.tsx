
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Users, FolderKanban, Settings } from 'lucide-react';
import Image from 'next/image';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
       <Card>
        <CardHeader>
            <CardTitle className="text-xl font-headline">Quick Stats</CardTitle>
            <CardDescription>A snapshot of your current activity.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatItem label="Total Files" value="1.2K" />
            <StatItem label="Active Users" value="78" />
            <StatItem label="Pending Approvals" value="12" />
            <StatItem label="Storage Used" value="64 GB" />
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
}

function StatItem({ label, value }: StatItemProps) {
    return (
        <div className="p-4 bg-secondary/50 rounded-lg text-center">
            <p className="text-2xl font-bold text-primary">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
        </div>
    );
}
