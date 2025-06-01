
"use client";

import React, { useState, useEffect } from 'react';
import { MOCK_DEPARTMENTS } from '@/lib/constants';
import { departmentColumns } from '@/components/department-table/columns';
import { DataTable } from '@/components/shared/data-table';
import type { DepartmentItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2 } from 'lucide-react'; // Using Building2 for variety

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<DepartmentItem[]>([]);

  useEffect(() => {
    // In a real app, you would fetch data here
    setDepartments(MOCK_DEPARTMENTS);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-headline">Department Management</CardTitle>
              <CardDescription>Manage all departments in the system.</CardDescription>
            </div>
            <Button size="sm">
              <Building2 className="mr-2 h-4 w-4" /> Add Department
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* DataTable will have its own filter input if filterColumnId is provided */}
        </CardContent>
      </Card>
      
      <DataTable 
        columns={departmentColumns} 
        data={departments} 
        filterColumnId="name"
        filterPlaceholder="Search by department name..."
      />
    </div>
  );
}
