
"use client";

import React, { useState, useEffect } from 'react';
import { MOCK_APPROVAL_LIST_ITEMS } from '@/lib/constants';
import { approvalListColumns } from '@/components/approval-list-table/columns';
import { DataTable } from '@/components/shared/data-table';
import type { ApprovalListItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ApprovalListPage() {
  const [approvalItems, setApprovalItems] = useState<ApprovalListItem[]>([]);

  useEffect(() => {
    setApprovalItems(MOCK_APPROVAL_LIST_ITEMS);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-headline">Approval & Pending List</CardTitle>
              <CardDescription>Review documents pending approval and view approval history.</CardDescription>
            </div>
            {/* No "Add" button for this page as items come from submissions */}
          </div>
        </CardHeader>
        <CardContent>
          {/* DataTable filter input will be part of DataTable component */}
        </CardContent>
      </Card>
      
      <DataTable 
        columns={approvalListColumns} 
        data={approvalItems} 
        filterColumnId="documentName"
        filterPlaceholder="Search by document name..."
      />
    </div>
  );
}
