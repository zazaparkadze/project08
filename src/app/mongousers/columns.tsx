"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import deleteEmployee from "@/lib/deleteEmployee";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "actions",
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-7 w-7 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black text-white">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(employee.firstname)}
            >
              Copy Employee Firstname
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View employee details</DropdownMenuItem>
            <DropdownMenuItem>Update employee</DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const response = await deleteEmployee(employee.id);
                if (JSON.parse(response).deletedCount === 0) {
                  const status = "notFound";
                  window.location.href = `/feedback/${status}`;
                } else {
                  const status = "deleted";
                  window.location.href = `/feedback/${status}`;
                }
              }}
            >
              Delete employee
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "firstname",
    header: "Firstname",
  },
  {
    accessorKey: "lastname",
    header: "Lastname",
  },
];
