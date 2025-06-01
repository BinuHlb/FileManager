
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_APPROVAL_LIST_ITEMS } from '@/lib/constants';
import { approvalListColumns } from '@/components/approval-list-table/columns';
import { DataTable } from '@/components/shared/data-table';
import type { ApprovalListItem } from '@/types';
import { ApprovalStatus } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ApprovalListPage() {
  const [allApprovalItems, setAllApprovalItems] = useState<ApprovalListItem[]>([]);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<ApprovalStatus | 'all'>('all');

  useEffect(() => {
    setIsTableLoading(true);
    const timer = setTimeout(() => {
      setAllApprovalItems(MOCK_APPROVAL_LIST_ITEMS);
      setIsTableLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const displayApprovalItems = useMemo(() => {
    if (statusFilter === 'all') {
      return allApprovalItems;
    }
    return allApprovalItems.filter(item => item.status === statusFilter);
  }, [allApprovalItems, statusFilter]);

  const statusFilterOptions = [
    { value: 'all', label: 'All Statuses' },
    ...Object.values(ApprovalStatus).map(status => ({ value: status, label: status }))
  ];

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
          {/* Filters are now inside DataTable */}
        </CardContent>
      </Card>
      
      <DataTable 
        columns={approvalListColumns} 
        data={displayApprovalItems} 
        filterColumnId="documentName"
        filterPlaceholder="Search by document name..."
        isLoading={isTableLoading}
        externalSelectFilter={{
          value: statusFilter,
          onChange: (value) => setStatusFilter(value as ApprovalStatus | 'all'),
          options: statusFilterOptions,
          placeholder: "Filter by status...",
          label: "Status:",
          onClear: () => setStatusFilter('all'),
          clearButtonLabel: "Clear Status"
        }}
      />
    </div>
  );
}
