
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
import { Button } from "@/components/ui/button";
import { FileFlowLogo } from "@/components/icons";
import {
  Folder,
  ChevronRight,
  UsersRound, 
  User,       
  ShieldCheck,
  Building,
  LogOut,
  LayoutGrid,
  FileText,
  Files,
  CheckCircle2,
  LayoutDashboard
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from '@/context/auth-context';

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
  submenu?: NavItem[];
  isBottom?: boolean;
}

const navItems: NavItem[] = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/file-manager", icon: Folder, label: "File Manager" },
  {
    href: "/user-management/users", 
    icon: UsersRound, 
    label: "User Management",
    submenu: [
      { href: "/user-management/users", icon: User, label: "Users" },
      { href: "/user-management/roles", icon: ShieldCheck, label: "Roles" },
      { href: "/user-management/departments", icon: Building, label: "Departments" },
    ],
  },
  {
    href: "/template-management/master-templates",
    icon: LayoutGrid,
    label: "Template Management",
    submenu: [
      { href: "/template-management/master-templates", icon: FileText, label: "Master Templates"},
      { href: "/template-management/documents", icon: Files, label: "List of Documents"},
      { href: "/template-management/approval-list", icon: CheckCircle2, label: "Approval List"},
    ]
  }
];

const bottomNavItems: NavItem[] = []; 

const NavMenuItemContent: React.FC<{ item: NavItem, isSubmenuItem?: boolean }> = ({ item, isSubmenuItem = false }) => {
  const { state: sidebarState, isMobile } = useSidebar();
  const Icon = item.icon;

  return (
    <>
      <Icon className={cn(isSubmenuItem ? "mr-2 h-4 w-4" : "h-5 w-5")} />
      <span className={cn(
        isSubmenuItem ? "text-sm" : "",
        (!isSubmenuItem && !isMobile && sidebarState === "collapsed") ? "hidden" : ""
      )}>{item.label}</span>
      {!isSubmenuItem && item.submenu && !isMobile && sidebarState === "expanded" && (
        <ChevronRight className="ml-auto h-4 w-4" />
      )}
    </>
  );
};

const NavMenuItem: React.FC<{ item: NavItem }> = ({ item }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { state: sidebarState, isMobile, setOpenMobile } = useSidebar();

  const handleMouseEnter = () => {
    if (!isMobile && item.submenu) { 
      setIsPopoverOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && item.submenu) {
      setIsPopoverOpen(false);
    }
  };
  
  const handleItemClick = (e: React.MouseEvent<HTMLElement>) => { 
    const isParentWithSubmenuInCollapsedDesktop = sidebarState === "collapsed" && !isMobile && item.submenu;

    if (isParentWithSubmenuInCollapsedDesktop) {
      e.preventDefault(); 
      setIsPopoverOpen(o => !o); 
      return;
    }
    
    if (isMobile) {
      if (item.submenu) {
         e.preventDefault(); 
         setIsPopoverOpen(o => !o);
      } else {
        setOpenMobile(false); 
      }
    }
  };


  if (item.submenu) {
    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="w-full">
            <SidebarMenuButton
              asChild={true} 
              className="w-full justify-start"
              tooltip={{ children: item.label, side: 'right', hidden: sidebarState === "expanded" || isMobile }}
            >
               <Link 
                  href={item.href} 
                  className="flex items-center w-full h-full" 
                  onClick={handleItemClick} 
                >
                   <NavMenuItemContent item={item} />
                </Link>
            </SidebarMenuButton>
          </div>
        </PopoverTrigger>
        <PopoverContent 
            side="right" 
            align="start" 
            className="ml-2 p-1 w-48 bg-primary text-primary-foreground shadow-lg rounded-md"
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >
          <SidebarMenu>
            {item.submenu.map((subItem) => (
              <SidebarMenuItem key={subItem.href}>
                <SidebarMenuButton 
                  asChild 
                  className="w-full justify-start h-8 text-sm bg-transparent text-primary-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground px-2 py-1.5 rounded-sm" 
                  onClick={() => { setIsPopoverOpen(false); if(isMobile) setOpenMobile(false);}}
                >
                  <Link href={subItem.href} className="flex items-center gap-2">
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
      onClick={ isMobile ? () => setOpenMobile(false) : undefined}
    >
      <Link href={item.href}>
        <NavMenuItemContent item={item} />
      </Link>
    </SidebarMenuButton>
  );
};


export function MainSidebar() {
  const { state: sidebarState, setOpenMobile, isMobile } = useSidebar();
  const { logout } = useAuth();
  return (
    <>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => {if(isMobile) setOpenMobile(false);}}>
          <FileFlowLogo className="h-8 w-8" />
          <span className={cn(
            "font-semibold text-xl font-headline",
            (!isMobile && sidebarState === "collapsed") ? "hidden" : ""
          )}>FileFlow</span>
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
        <div className={cn(
            "flex items-center gap-3 p-2 mt-2 rounded-lg bg-sidebar-accent/50",
            (!isMobile && sidebarState === 'collapsed') ? 'justify-center' : ''
        )}>
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="user avatar"/>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className={cn(
            (!isMobile && sidebarState === "collapsed") ? "hidden" : ""
          )}>
            <p className="font-semibold text-sm text-sidebar-accent-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">john.doe@example.com</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-start mt-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            (!isMobile && sidebarState === 'collapsed') ? 'justify-center' : 'justify-start'
          )}
          onClick={() => {
            logout();
            if(isMobile) setOpenMobile(false);
          }}
        >
          <LogOut className={cn(
              "h-5 w-5", 
              (isMobile || sidebarState === 'expanded') ? "mr-2" : ""
          )} />
          <span className={cn(
            (!isMobile && sidebarState === "collapsed") ? "hidden" : ""
          )}>Logout</span>
        </Button>
      </SidebarFooter>
    </>
  );
}

