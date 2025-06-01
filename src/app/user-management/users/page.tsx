
"use client";

import React, { useState, useEffect } from 'react';
import { MOCK_USERS } from '@/lib/constants';
import { userColumns } from '@/components/user-table/columns';
import { DataTable } from '@/components/shared/data-table';
import type { UserItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);

  useEffect(() => {
    // In a real app, you would fetch data here
    setUsers(MOCK_USERS);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-headline">User Management</CardTitle>
              <CardDescription>Manage all users in the system.</CardDescription>
            </div>
            <Button size="sm">
              <UserPlus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* DataTable will have its own filter input if filterColumnId is provided */}
        </CardContent>
      </Card>
      
      <DataTable 
        columns={userColumns} 
        data={users} 
        filterColumnId="firstName" // Or "email" or a combined global filter
        filterPlaceholder="Search by first name..."
      />
    </div>
  );
}
