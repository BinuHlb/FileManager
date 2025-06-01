
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_FILES } from '@/lib/constants';
import { columns } from '@/components/file-table/columns';
import { DataTable } from '@/components/shared/data-table';
import type { FileItem } from '@/types';
import { FileType } from '@/types';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, ListFilter, UploadCloud, FolderPlus } from 'lucide-react';
import { format, isValid, parseISO } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function FileManagerPage() {
  const [allFiles, setAllFiles] = useState<FileItem[]>([]);
  const [typeFilter, setTypeFilter] = useState<FileType | 'all'>('all');
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setAllFiles(MOCK_FILES.map(file => ({
      ...file,
      lastModified: typeof file.lastModified === 'string' ? parseISO(file.lastModified) : file.lastModified
    })));
  }, []);

  const filteredFiles = useMemo(() => {
    return allFiles.filter(file => {
      const typeMatch = typeFilter === 'all' || file.type === typeFilter;
      const dateMatch = !dateFilter || 
        (isValid(file.lastModified) && format(file.lastModified, 'yyyy-MM-dd') === format(dateFilter, 'yyyy-MM-dd'));
      return typeMatch && dateMatch;
    });
  }, [allFiles, typeFilter, dateFilter]);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">File Manager</CardTitle>
          <CardDescription>Browse, search, and manage your files efficiently.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 items-end">
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
             <div className="flex items-center gap-2 md:col-start-2 lg:col-start-3 justify-self-start md:justify-self-end">
                <Button variant="outline" size="sm" onClick={() => { setTypeFilter('all'); setDateFilter(undefined); }}>
                  <ListFilter className="mr-2 h-4 w-4" /> <span className="hidden sm:inline">Clear Type/Date Filters</span><span className="sm:hidden">Clear Filters</span>
                </Button>
             </div>
          </div>
           <div className="flex flex-wrap justify-end items-center gap-2 mb-6">
             <Button size="sm">
                <UploadCloud className="mr-2 h-4 w-4" /> Upload File
            </Button>
            <Button variant="secondary" size="sm">
                <FolderPlus className="mr-2 h-4 w-4" /> Create Folder
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <DataTable 
        columns={columns} 
        data={filteredFiles} 
        filterColumnId="name"
        filterPlaceholder="Search by name..."
      />
    </div>
  );
}
