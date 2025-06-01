
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_USERS } from '@/lib/constants';
import { userColumns } from '@/components/user-table/columns';
import { DataTable } from '@/components/shared/data-table';
import type { UserItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, ListFilter } from 'lucide-react';
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
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const userFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  isActive: z.boolean().default(true),
});

type UserFormData = z.infer<typeof userFormSchema>;

export default function UsersPage() {
  const [allUsers, setAllUsers] = useState<UserItem[]>([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [activityFilter, setActivityFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      isActive: true,
    },
  });

  useEffect(() => {
    setIsTableLoading(true);
    const timer = setTimeout(() => {
      setAllUsers(MOCK_USERS);
      setIsTableLoading(false);
    }, 1500); // Simulate 1.5 second delay
    return () => clearTimeout(timer);
  }, []);

  function onSubmit(data: UserFormData) {
    console.log("New User Data:", data);
    // Here you would typically call an API to save the user
    // For now, we'll just log it and simulate adding to the mock list (optional)
    const newUser: UserItem = {
      id: `user-${Date.now()}`,
      srNo: allUsers.length + 1,
      ...data,
    };
    // setAllUsers(prevUsers => [...prevUsers, newUser]); // Uncomment to add to table visually
    form.reset();
    setIsAddUserModalOpen(false);
  }

  const displayUsers = useMemo(() => {
    if (activityFilter === 'all') {
      return allUsers;
    }
    const isActiveFilter = activityFilter === 'active';
    return allUsers.filter(user => user.isActive === isActiveFilter);
  }, [allUsers, activityFilter]);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-headline">User Management</CardTitle>
              <CardDescription>Manage all users in the system.</CardDescription>
            </div>
            <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <UserPlus className="mr-2 h-4 w-4" /> Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new user. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john.doe@example.com" {...field} />
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
                      <Button type="submit">Save User</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 items-end">
            <div>
              <Label htmlFor="activity-filter" className="block text-sm font-medium text-muted-foreground mb-1">Filter by activity</Label>
              <Select value={activityFilter} onValueChange={(value) => setActivityFilter(value as 'all' | 'active' | 'inactive')}>
                <SelectTrigger id="activity-filter" className="h-10">
                  <SelectValue placeholder="Select activity status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center md:justify-self-end">
              <Button variant="outline" size="sm" onClick={() => setActivityFilter('all')}>
                <ListFilter className="mr-2 h-4 w-4" /> Clear Activity Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <DataTable 
        columns={userColumns} 
        data={displayUsers} 
        filterColumnId="firstName" 
        filterPlaceholder="Search by first name..."
        isLoading={isTableLoading}
      />
    </div>
  );
}
