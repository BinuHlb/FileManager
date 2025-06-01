
"use client";

import React, { useState, useEffect } from 'react';
import { MOCK_ROLES } from '@/lib/constants';
import { roleColumns } from '@/components/role-table/columns';
import { DataTable } from '@/components/shared/data-table';
import type { RoleItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldPlus } from 'lucide-react';

export default function RolesPage() {
  const [roles, setRoles] = useState<RoleItem[]>([]);

  useEffect(() => {
    // In a real app, you would fetch data here
    setRoles(MOCK_ROLES);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-headline">Role Management</CardTitle>
              <CardDescription>Manage all roles in the system.</CardDescription>
            </div>
            <Button size="sm">
              <ShieldPlus className="mr-2 h-4 w-4" /> Add Role
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* DataTable will have its own filter input if filterColumnId is provided */}
        </CardContent>
      </Card>
      
      <DataTable 
        columns={roleColumns} 
        data={roles} 
        filterColumnId="role"
        filterPlaceholder="Search by role name..."
      />
    </div>
  );
}
