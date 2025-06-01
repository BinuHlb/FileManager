
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
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileFlowLogo } from "@/components/icons";
import {
  Folder,
  ChevronRight,
  UsersRound, // For User Management parent
  User,       // For Users child item
  ShieldCheck,// For Roles child item
  Building    // For Departments child item
} from "lucide-react";

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
  submenu?: NavItem[];
  isBottom?: boolean;
}

const navItems: NavItem[] = [
  { href: "/", icon: Folder, label: "File Manager" },
  {
    href: "/user-management/users", // Parent link for User Management, directs to the first child
    icon: UsersRound, 
    label: "User Management",
    submenu: [
      { href: "/user-management/users", icon: User, label: "Users" },
      { href: "/user-management/roles", icon: ShieldCheck, label: "Roles" },
      { href: "/user-management/departments", icon: Building, label: "Departments" },
    ],
  },
];

const bottomNavItems: NavItem[] = []; // All bottom items removed as they are unrouted

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
  const { state: sidebarState, isMobile, setOpenMobile } = useSidebar();

  const handleMouseEnter = () => {
    if (sidebarState === "expanded" && !isMobile && item.submenu) {
      setIsPopoverOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (sidebarState === "expanded" && !isMobile && item.submenu) {
      setIsPopoverOpen(false);
    }
  };
  
  const handleItemClick = () => {
    if (isMobile) {
      // If it's a main item with submenu, toggle popover, otherwise close sidebar for navigation
      if (item.submenu) {
         setIsPopoverOpen(o => !o);
      } else {
        setOpenMobile(false);
      }
    } else if (sidebarState === "collapsed" && item.submenu) {
        setIsPopoverOpen(o => !o);
    }
    // If it's a main item without submenu and sidebar is expanded, or a submenu item, allow direct navigation.
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
              onClick={handleItemClick}
            >
              {sidebarState === "collapsed" || isMobile ? (
                <Link href={item.href} className="flex items-center w-full h-full" onClick={(e) => { if (isMobile && item.submenu) e.preventDefault(); handleItemClick(); }}>
                   <NavMenuItemContent item={item} />
                </Link>
              ) : (
                 <div className="flex items-center w-full h-full cursor-pointer" onClick={handleItemClick}>
                    <NavMenuItemContent item={item} />
                 </div>
              )}
            </SidebarMenuButton>
          </div>
        </PopoverTrigger>
        <PopoverContent 
            side="right" 
            align="start" 
            className="ml-2 p-1 w-48" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
            hidden={sidebarState === "collapsed" && !isMobile && !isPopoverOpen}
        >
          <SidebarMenu>
            {item.submenu.map((subItem) => (
              <SidebarMenuItem key={subItem.href}>
                <SidebarMenuButton asChild className="w-full justify-start h-8 text-sm" variant="ghost" onClick={() => { setIsPopoverOpen(false); if(isMobile) setOpenMobile(false);}}>
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

  // Non-submenu item
  return (
    <SidebarMenuButton
      asChild
      className="w-full justify-start"
      tooltip={{ children: item.label, side: 'right', hidden: sidebarState === "expanded" || isMobile }}
      onClick={handleItemClick}
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
            <SidebarMenuItem key={item.href + (item.submenu ? '-parent' : '')}>
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
