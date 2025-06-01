
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_DEPARTMENTS } from '@/lib/constants';
import { departmentColumns } from '@/components/department-table/columns';
import { DataTable } from '@/components/shared/data-table';
import type { DepartmentItem } from '@/types';
import { DepartmentStatus } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, ListFilter } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Label } from '@/components/ui/label';

const departmentFormSchema = z.object({
  name: z.string().min(1, { message: "Department name is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  isActive: z.boolean().default(true),
  status: z.nativeEnum(DepartmentStatus).default(DepartmentStatus.ACTIVE),
});

type DepartmentFormData = z.infer<typeof departmentFormSchema>;

export default function DepartmentsPage() {
  const [allDepartments, setAllDepartments] = useState<DepartmentItem[]>([]);
  const [isAddDeptModalOpen, setIsAddDeptModalOpen] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<DepartmentStatus | 'all'>('all');

  const form = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
      status: DepartmentStatus.ACTIVE,
    },
  });

  useEffect(() => {
    setIsTableLoading(true);
    const timer = setTimeout(() => {
      setAllDepartments(MOCK_DEPARTMENTS);
      setIsTableLoading(false);
    }, 1500); // Simulate 1.5 second delay
    return () => clearTimeout(timer);
  }, []);

  function onSubmit(data: DepartmentFormData) {
    console.log("New Department Data:", data);
    // Add to mock list or call API
    // const newDept: DepartmentItem = { id: `dept-${Date.now()}`, srNo: departments.length + 1, ...data };
    // setAllDepartments(prev => [...prev, newDept]);
    form.reset();
    setIsAddDeptModalOpen(false);
  }

  const displayDepartments = useMemo(() => {
    if (statusFilter === 'all') {
      return allDepartments;
    }
    return allDepartments.filter(dept => dept.status === statusFilter);
  }, [allDepartments, statusFilter]);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-headline">Department Management</CardTitle>
              <CardDescription>Manage all departments in the system.</CardDescription>
            </div>
            <Dialog open={isAddDeptModalOpen} onOpenChange={setIsAddDeptModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Building2 className="mr-2 h-4 w-4" /> Add Department
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Department</DialogTitle>
                  <DialogDescription>
                    Create a new department. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Human Resources" {...field} />
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
                            <Textarea placeholder="Manages employee relations, recruitment, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(DepartmentStatus).map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                      <Button type="submit">Save Department</Button>
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
              <Label htmlFor="status-filter" className="block text-sm font-medium text-muted-foreground mb-1">Filter by status</Label>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as DepartmentStatus | 'all')}>
                <SelectTrigger id="status-filter" className="h-10">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {Object.values(DepartmentStatus).map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center md:justify-self-end">
              <Button variant="outline" size="sm" onClick={() => setStatusFilter('all')}>
                <ListFilter className="mr-2 h-4 w-4" /> Clear Status Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <DataTable 
        columns={departmentColumns} 
        data={displayDepartments} 
        filterColumnId="name"
        filterPlaceholder="Search by department name..."
        isLoading={isTableLoading}
      />
    </div>
  );
}
