
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { DocumentListItem } from "@/types";
import { DocumentStatus } from "@/types";
import { ArrowUpDown, MoreHorizontal, Edit3, Trash2, Eye } from "lucide-react";
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

export const documentListColumns: ColumnDef<DocumentListItem>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Document Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "templateUsed",
    header: "Template Used",
    cell: ({ row }) => row.getValue("templateUsed"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as DocumentStatus;
      let badgeVariant: "default" | "secondary" | "outline" | "destructive" = "outline";
      if (status === DocumentStatus.APPROVED) badgeVariant = "default"; // green-like
      if (status === DocumentStatus.PENDING_APPROVAL) badgeVariant = "secondary"; // yellow-like
      if (status === DocumentStatus.DRAFT) badgeVariant = "outline"; // gray-like
      if (status === DocumentStatus.REJECTED) badgeVariant = "destructive"; // red-like
      return <Badge variant={badgeVariant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => row.getValue("createdBy"),
  },
  {
    accessorKey: "lastModified",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Last Modified
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue("lastModified") as Date;
      return <div>{format(new Date(date), "PPpp")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const document = row.original;
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
            <DropdownMenuItem onClick={() => console.log("View Details for ID:", document.id, document)}>
              <Eye className="mr-2 h-4 w-4" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Edit document", document.id)}>
              <Edit3 className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive focus:bg-destructive/10"
              onClick={() => console.log("Delete document", document.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
