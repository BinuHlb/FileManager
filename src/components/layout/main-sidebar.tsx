"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FileFlowLogo } from "@/components/icons";
import {
  LayoutDashboard,
  Folder,
  Users,
  Clock,
  Trash2,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  Video,
  Settings,
  LogOut,
  HardDrive,
  Cloud,
  Star
} from "lucide-react";

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
  submenu?: NavItem[];
  isBottom?: boolean;
}

const navItems: NavItem[] = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  {
    href: "/my-files",
    icon: Folder,
    label: "My Files",
    submenu: [
      { href: "/my-files/documents", icon: FileText, label: "Documents" },
      { href: "/my-files/images", icon: ImageIcon, label: "Images" },
      { href: "/my-files/videos", icon: Video, label: "Videos" },
    ],
  },
  { href: "/shared", icon: Users, label: "Shared with Me" },
  { href: "/recent", icon: Clock, label: "Recent" },
  { href: "/favorites", icon: Star, label: "Favorites"},
  {
    href: "/storage",
    icon: HardDrive,
    label: "Storage",
    submenu: [
        { href: "/storage/local", icon: HardDrive, label: "Local Disk" },
        { href: "/storage/cloud", icon: Cloud, label: "Cloud Sync" },
    ]
  },
  { href: "/trash", icon: Trash2, label: "Trash" },
];

const bottomNavItems: NavItem[] = [
    { href: "/settings", icon: Settings, label: "Settings", isBottom: true },
    { href: "/logout", icon: LogOut, label: "Logout", isBottom: true },
]

const NavMenuItemContent: React.FC<{ item: NavItem, isSubmenuItem?: boolean }> = ({ item, isSubmenuItem = false }) => {
  const { state: sidebarState } = useSidebar();
  const Icon = item.icon;

  return (
    <>
      <Icon className={isSubmenuItem ? "mr-2 h-4 w-4" : ""} />
      <span className={isSubmenuItem ? "text-sm" : ""}>{item.label}</span>
      {!isSubmenuItem && item.submenu && sidebarState === "expanded" && (
        <ChevronRight className="ml-auto h-4 w-4" />
      )}
    </>
  );
};

const NavMenuItem: React.FC<{ item: NavItem }> = ({ item }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { state: sidebarState, isMobile } = useSidebar();

  const handleMouseEnter = () => {
    if (sidebarState === "expanded" && !isMobile) {
      setIsPopoverOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (sidebarState === "expanded" && !isMobile) {
      setIsPopoverOpen(false);
    }
  };

  if (item.submenu) {
    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="w-full">
            <SidebarMenuButton
              asChild={sidebarState === "collapsed" || isMobile}
              className="w-full justify-start"
              tooltip={{ children: item.label, side: 'right', hidden: sidebarState === "expanded" || isMobile }}
              onClick={() => { if (isMobile || sidebarState === "collapsed") setIsPopoverOpen(o => !o) }}
            >
              {sidebarState === "collapsed" || isMobile ? (
                <Link href={item.href} className="flex items-center w-full h-full">
                   <NavMenuItemContent item={item} />
                </Link>
              ) : (
                 <div className="flex items-center w-full h-full cursor-pointer">
                    <NavMenuItemContent item={item} />
                 </div>
              )}
            </SidebarMenuButton>
          </div>
        </PopoverTrigger>
        <PopoverContent side="right" align="start" className="ml-2 p-1 w-48" 
                        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                        hidden={sidebarState === "collapsed" && !isMobile} // Hide popover content when sidebar is collapsed on desktop
        >
          <SidebarMenu>
            {item.submenu.map((subItem) => (
              <SidebarMenuItem key={subItem.href}>
                <SidebarMenuButton asChild className="w-full justify-start h-8 text-sm" variant="ghost">
                  <Link href={subItem.href}>
                    <NavMenuItemContent item={subItem} isSubmenuItem={true}/>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <SidebarMenuButton
      asChild
      className="w-full justify-start"
      tooltip={{ children: item.label, side: 'right', hidden: sidebarState === "expanded" || isMobile }}
    >
      <Link href={item.href}>
        <NavMenuItemContent item={item} />
      </Link>
    </SidebarMenuButton>
  );
};


export function MainSidebar() {
  const { setOpenMobile } = useSidebar();
  return (
    <>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpenMobile(false)}>
          <FileFlowLogo className="h-8 w-8" />
          <span className="font-semibold text-xl font-headline">FileFlow</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <NavMenuItem item={item} />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="p-2">
         <SidebarMenu>
            {bottomNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <NavMenuItem item={item} />
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
        <div className="flex items-center gap-3 p-2 mt-2 rounded-lg bg-sidebar-accent/50">
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="user avatar"/>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="group-data-[collapsible=icon]:hidden">
            <p className="font-semibold text-sm text-sidebar-accent-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">john.doe@example.com</p>
          </div>
        </div>
      </SidebarFooter>
    </>
  );
}
