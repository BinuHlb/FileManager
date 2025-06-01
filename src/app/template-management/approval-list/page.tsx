
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_APPROVAL_LIST_ITEMS } from '@/lib/constants';
import { approvalListColumns } from '@/components/approval-list-table/columns';
import { DataTable } from '@/components/shared/data-table';
import type { ApprovalListItem } from '@/types';
import { ApprovalStatus } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListFilter } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ApprovalListPage() {
  const [allApprovalItems, setAllApprovalItems] = useState<ApprovalListItem[]>([]);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<ApprovalStatus | 'all'>('all');

  useEffect(() => {
    setIsTableLoading(true);
    const timer = setTimeout(() => {
      setAllApprovalItems(MOCK_APPROVAL_LIST_ITEMS);
      setIsTableLoading(false);
    }, 1500); // Simulate 1.5 second delay
    return () => clearTimeout(timer);
  }, []);

  const displayApprovalItems = useMemo(() => {
    if (statusFilter === 'all') {
      return allApprovalItems;
    }
    return allApprovalItems.filter(item => item.status === statusFilter);
  }, [allApprovalItems, statusFilter]);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-headline">Approval & Pending List</CardTitle>
              <CardDescription>Review documents pending approval and view approval history.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 items-end">
            <div>
              <Label htmlFor="status-filter" className="block text-sm font-medium text-muted-foreground mb-1">Filter by status</Label>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ApprovalStatus | 'all')}>
                <SelectTrigger id="status-filter" className="h-10">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {Object.values(ApprovalStatus).map(status => (
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
        columns={approvalListColumns} 
        data={displayApprovalItems} 
        filterColumnId="documentName"
        filterPlaceholder="Search by document name..."
        isLoading={isTableLoading}
      />
    </div>
  );
}
