
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_MASTER_TEMPLATES } from '@/lib/constants';
import { masterTemplateColumns } from '@/components/master-template-table/columns';
import { DataTable } from '@/components/shared/data-table';
import type { MasterTemplateItem } from '@/types';
import { TemplateStatus } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilePlus2, ListFilter } from 'lucide-react';
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

const masterTemplateFormSchema = z.object({
  name: z.string().min(1, { message: "Template name is required." }),
  description: z.string().optional(),
  version: z.string().min(1, { message: "Version is required (e.g., 1.0)." }),
  status: z.nativeEnum(TemplateStatus).default(TemplateStatus.DRAFT),
});

type MasterTemplateFormData = z.infer<typeof masterTemplateFormSchema>;

export default function MasterTemplatesPage() {
  const [allTemplates, setAllTemplates] = useState<MasterTemplateItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<TemplateStatus | 'all'>('all');

  const form = useForm<MasterTemplateFormData>({
    resolver: zodResolver(masterTemplateFormSchema),
    defaultValues: {
      name: "",
      description: "",
      version: "1.0",
      status: TemplateStatus.DRAFT,
    },
  });

  useEffect(() => {
    setIsTableLoading(true);
    const timer = setTimeout(() => {
      setAllTemplates(MOCK_MASTER_TEMPLATES);
      setIsTableLoading(false);
    }, 1500); // Simulate 1.5 second delay
    return () => clearTimeout(timer);
  }, []);

  function onSubmit(data: MasterTemplateFormData) {
    console.log("New Master Template Data:", data);
    // Add to mock list or call API
    // const newTemplate: MasterTemplateItem = { 
    //   id: `mt-${Date.now()}`, 
    //   srNo: templates.length + 1, 
    //   ...data,
    //   description: data.description || "", 
    //   lastModified: new Date() 
    // };
    // setAllTemplates(prev => [...prev, newTemplate]);
    form.reset();
    setIsAddModalOpen(false);
  }

  const displayTemplates = useMemo(() => {
    if (statusFilter === 'all') {
      return allTemplates;
    }
    return allTemplates.filter(template => template.status === statusFilter);
  }, [allTemplates, statusFilter]);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-headline">Master Template Management</CardTitle>
              <CardDescription>Manage all master document templates.</CardDescription>
            </div>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <FilePlus2 className="mr-2 h-4 w-4" /> Add Master Template
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Master Template</DialogTitle>
                  <DialogDescription>
                    Create a new master template. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Template Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Contract Template" {...field} />
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
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Standard contract for client engagements." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="version"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Version</FormLabel>
                          <FormControl>
                            <Input placeholder="1.0" {...field} />
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
                              {Object.values(TemplateStatus).map((status) => (
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
                    <DialogFooter>
                       <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Save Template</Button>
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
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as TemplateStatus | 'all')}>
                <SelectTrigger id="status-filter" className="h-10">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {Object.values(TemplateStatus).map(status => (
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
        columns={masterTemplateColumns} 
        data={displayTemplates} 
        filterColumnId="name"
        filterPlaceholder="Search by template name..."
        isLoading={isTableLoading}
      />
    </div>
  );
}
