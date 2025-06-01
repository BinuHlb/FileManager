
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { MasterTemplateItem } from "@/types";
import { TemplateStatus } from "@/types";
import { ArrowUpDown, MoreHorizontal, Edit3, Trash2 } from "lucide-react";
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

export const masterTemplateColumns: ColumnDef<MasterTemplateItem>[] = [
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
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "version",
    header: "Version",
    cell: ({ row }) => row.getValue("version"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as TemplateStatus;
      let badgeVariant: "default" | "secondary" | "outline" = "outline";
      if (status === TemplateStatus.PUBLISHED) badgeVariant = "default";
      if (status === TemplateStatus.DRAFT) badgeVariant = "secondary";
      if (status === TemplateStatus.ARCHIVED) badgeVariant = "destructive";
      return <Badge variant={badgeVariant}>{status}</Badge>;
    },
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
      const template = row.original;
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
            <DropdownMenuItem onClick={() => console.log("Edit template", template.id)}>
              <Edit3 className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive focus:bg-destructive/10"
              onClick={() => console.log("Delete template", template.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
