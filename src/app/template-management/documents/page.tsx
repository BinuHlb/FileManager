
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_DOCUMENT_LIST_ITEMS } from '@/lib/constants';
import { documentListColumns } from '@/components/document-list-table/columns';
import { DataTable } from '@/components/shared/data-table';
import type { DocumentListItem } from '@/types';
import { DocumentStatus } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilePlus, ListFilter } from 'lucide-react';
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

const documentFormSchema = z.object({
  name: z.string().min(1, { message: "Document name is required." }),
  templateUsed: z.string().min(1, { message: "Template used is required." }), // Simple text for now
  status: z.nativeEnum(DocumentStatus).default(DocumentStatus.DRAFT),
});

type DocumentFormData = z.infer<typeof documentFormSchema>;

export default function DocumentsPage() {
  const [allDocuments, setAllDocuments] = useState<DocumentListItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<DocumentStatus | 'all'>('all');

  const form = useForm<DocumentFormData>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      name: "",
      templateUsed: "",
      status: DocumentStatus.DRAFT,
    },
  });

  useEffect(() => {
    setIsTableLoading(true);
    const timer = setTimeout(() => {
      setAllDocuments(MOCK_DOCUMENT_LIST_ITEMS);
      setIsTableLoading(false);
    }, 1500); // Simulate 1.5 second delay
    return () => clearTimeout(timer);
  }, []);

  function onSubmit(data: DocumentFormData) {
    console.log("New Document Data:", data);
    // Add to mock list or call API
    // const newDoc: DocumentListItem = {
    //   id: `doc-${Date.now()}`,
    //   srNo: documents.length + 1,
    //   ...data,
    //   createdBy: "current.user@example.com", // Placeholder
    //   lastModified: new Date(),
    // };
    // setAllDocuments(prev => [...prev, newDoc]);
    form.reset();
    setIsAddModalOpen(false);
  }

  const displayDocuments = useMemo(() => {
    if (statusFilter === 'all') {
      return allDocuments;
    }
    return allDocuments.filter(doc => doc.status === statusFilter);
  }, [allDocuments, statusFilter]);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-headline">Document List</CardTitle>
              <CardDescription>Manage all documents created from templates.</CardDescription>
            </div>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <FilePlus className="mr-2 h-4 w-4" /> Create Document
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Document</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new document. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Document Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Client Agreement XYZ" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="templateUsed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Template Used</FormLabel>
                          <FormControl>
                            {/* Replace with Select fetching Master Templates in a real app */}
                            <Input placeholder="Master Contract Template v1.2" {...field} />
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
                          <FormLabel>Initial Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select initial status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {/* Typically only Draft or Pending Approval for new docs */}
                              <SelectItem value={DocumentStatus.DRAFT}>{DocumentStatus.DRAFT}</SelectItem>
                              <SelectItem value={DocumentStatus.PENDING_APPROVAL}>{DocumentStatus.PENDING_APPROVAL}</SelectItem>
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
                      <Button type="submit">Save Document</Button>
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
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as DocumentStatus | 'all')}>
                <SelectTrigger id="status-filter" className="h-10">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {Object.values(DocumentStatus).map(status => (
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
        columns={documentListColumns} 
        data={displayDocuments} 
        filterColumnId="name"
        filterPlaceholder="Search by document name..."
        isLoading={isTableLoading}
      />
    </div>
  );
}
