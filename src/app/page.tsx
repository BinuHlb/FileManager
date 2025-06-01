"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_FILES } from '@/lib/constants';
import { columns } from '@/components/file-table/columns';
import { DataTable } from '@/components/file-table/data-table';
import type { FileItem } from '@/types';
import { FileType } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, ListFilter, UploadCloud, FolderPlus } from 'lucide-react';
import { format, isValid, parseISO } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function FileManagementPage() {
  const [allFiles, setAllFiles] = useState<FileItem[]>(MOCK_FILES); // This could come from an API
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<FileType | 'all'>('all');
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);

  // Effect to simulate loading files (e.g., from an API)
  useEffect(() => {
    // In a real app, you would fetch data here
    // For now, MOCK_FILES are used directly
    setAllFiles(MOCK_FILES.map(file => ({
      ...file,
      // Ensure lastModified is a Date object
      lastModified: typeof file.lastModified === 'string' ? parseISO(file.lastModified) : file.lastModified
    })));
  }, []);


  const filteredFiles = useMemo(() => {
    return allFiles.filter(file => {
      const nameMatch = nameFilter === '' || file.name.toLowerCase().includes(nameFilter.toLowerCase());
      const typeMatch = typeFilter === 'all' || file.type === typeFilter;
      const dateMatch = !dateFilter || 
        (isValid(file.lastModified) && format(file.lastModified, 'yyyy-MM-dd') === format(dateFilter, 'yyyy-MM-dd'));
      return nameMatch && typeMatch && dateMatch;
    });
  }, [allFiles, nameFilter, typeFilter, dateFilter]);

  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">File Manager</CardTitle>
          <CardDescription>Browse, search, and manage your files efficiently.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 items-end">
            <div className="md:col-span-2 lg:col-span-2">
              <label htmlFor="name-filter" className="block text-sm font-medium text-muted-foreground mb-1">Search by name</label>
              <Input
                id="name-filter"
                placeholder="Enter file name..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="h-10"
              />
            </div>
            <div>
              <label htmlFor="type-filter" className="block text-sm font-medium text-muted-foreground mb-1">Filter by type</label>
              <Select
                value={typeFilter}
                onValueChange={(value) => setTypeFilter(value as FileType | 'all')}
              >
                <SelectTrigger className="h-10" id="type-filter">
                  <SelectValue placeholder="Select file type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {Object.values(FileType).map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
             <label htmlFor="date-filter" className="block text-sm font-medium text-muted-foreground mb-1">Filter by date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date-filter"
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal h-10"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFilter ? format(dateFilter, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFilter}
                    onSelect={setDateFilter}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
           <div className="flex items-center gap-2 mb-6">
            <Button variant="outline" size="sm" onClick={() => { setNameFilter(''); setTypeFilter('all'); setDateFilter(undefined);}}>
              <ListFilter className="mr-2 h-4 w-4" /> Clear Filters
            </Button>
             <Button size="sm" className="ml-auto">
                <UploadCloud className="mr-2 h-4 w-4" /> Upload File
            </Button>
            <Button variant="secondary" size="sm">
                <FolderPlus className="mr-2 h-4 w-4" /> Create Folder
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <DataTable columns={columns} data={filteredFiles} />
    </div>
  );
}
