
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_ROLES } from '@/lib/constants';
import { roleColumns } from '@/components/role-table/columns';
import { DataTable } from '@/components/shared/data-table';
import type { RoleItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldPlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const roleFormSchema = z.object({
  role: z.string().min(1, { message: "Role name is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  isActive: z.boolean().default(true),
});

type RoleFormData = z.infer<typeof roleFormSchema>;

export default function RolesPage() {
  const [allRoles, setAllRoles] = useState<RoleItem[]>([]);
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [activityFilter, setActivityFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const form = useForm<RoleFormData>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      role: "",
      description: "",
      isActive: true,
    },
  });

  useEffect(() => {
    setIsTableLoading(true);
    const timer = setTimeout(() => {
      setAllRoles(MOCK_ROLES);
      setIsTableLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  function onSubmit(data: RoleFormData) {
    console.log("New Role Data:", data);
    form.reset();
    setIsAddRoleModalOpen(false);
  }

  const displayRoles = useMemo(() => {
    if (activityFilter === 'all') {
      return allRoles;
    }
    const isActiveFilter = activityFilter === 'active';
    return allRoles.filter(role => role.isActive === isActiveFilter);
  }, [allRoles, activityFilter]);

  const activityFilterOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  return (
    <div className="flex flex-col gap-6">
      <Card >
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-headline">Role Management</CardTitle>
              <CardDescription>Manage all roles in the system.</CardDescription>
            </div>
            <Dialog open={isAddRoleModalOpen} onOpenChange={setIsAddRoleModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <ShieldPlus className="mr-2 h-4 w-4" /> Add Role
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Role</DialogTitle>
                  <DialogDescription>
                    Define a new role and its permissions. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Administrator" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Full access to all system features." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Active</FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                       <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Save Role</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
         {/* Filters are now inside DataTable */}
        </CardContent>
      </Card>
      
      <DataTable 
        columns={roleColumns} 
        data={displayRoles} 
        filterColumnId="role"
        filterPlaceholder="Search by role name..."
        isLoading={isTableLoading}
        externalSelectFilter={{
          value: activityFilter,
          onChange: (value) => setActivityFilter(value as 'all' | 'active' | 'inactive'),
          options: activityFilterOptions,
          placeholder: "Filter by activity...",
          label: "Activity:",
          onClear: () => setActivityFilter('all'),
          clearButtonLabel: "Clear Activity"
        }}
      />
    </div>
  );
}
