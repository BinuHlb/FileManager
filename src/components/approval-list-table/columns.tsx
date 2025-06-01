
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { ApprovalListItem } from "@/types";
import { ApprovalStatus } from "@/types";
import { ArrowUpDown, MoreHorizontal, Check, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const approvalListColumns: ColumnDef<ApprovalListItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "srNo",
    header: "Sr.No.",
    cell: ({ row }) => row.index + 1,
    enableSorting: false,
  },
  {
    accessorKey: "documentName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Document Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => row.getValue("documentName"),
  },
  {
    accessorKey: "submittedBy",
    header: "Submitted By",
    cell: ({ row }) => row.getValue("submittedBy"),
  },
  {
    accessorKey: "submissionDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Submission Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue("submissionDate") as Date;
      return <div>{format(new Date(date), "PP")}</div>; // Date only
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as ApprovalStatus;
      let badgeVariant: "default" | "secondary" | "destructive" = "secondary";
      if (status === ApprovalStatus.APPROVED) badgeVariant = "default";
      if (status === ApprovalStatus.REJECTED) badgeVariant = "destructive";
      // PENDING is secondary (default)
      return <Badge variant={badgeVariant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "approver",
    header: "Approver",
    cell: ({ row }) => row.getValue("approver") || "N/A",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      const isPending = item.status === ApprovalStatus.PENDING;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => console.log("View Details for ID:", item.id, item)}>
              <Eye className="mr-2 h-4 w-4" /> View Details
            </DropdownMenuItem>
            {isPending && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => console.log("Approve item", item.id)} className="text-green-600 focus:text-green-700 focus:bg-green-50">
                  <Check className="mr-2 h-4 w-4" /> Approve
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Reject item", item.id)} className="text-red-600 focus:text-red-700 focus:bg-red-50">
                  <X className="mr-2 h-4 w-4" /> Reject
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
