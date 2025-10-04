import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { mockExpenses } from "@/lib/mockData";
import { Expense } from "@/types";
import { toast } from "sonner";

export default function ManagerApprovals() {
  const userRole = JSON.parse(localStorage.getItem("currentUser") || "{}").role || "manager";
  const [expenses, setExpenses] = useState(mockExpenses.filter((e) => e.status === "pending"));

  const handleApprove = (expense: Expense) => {
    setExpenses(expenses.filter((e) => e.id !== expense.id));
    toast.success(`Approved ${expense.description}`);
  };

  const handleReject = (expense: Expense) => {
    setExpenses(expenses.filter((e) => e.id !== expense.id));
    toast.error(`Rejected ${expense.description}`);
  };

  return (
    <DashboardLayout userRole={userRole}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Approval Queue</h1>
          <p className="text-muted-foreground mt-1">Review and approve pending expense requests</p>
        </div>

        <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Pending Approvals</h2>
              <span className="px-3 py-1 bg-status-pending/10 text-status-pending rounded-full text-sm font-medium">
                {expenses.length} Pending
              </span>
            </div>
          </div>

          {expenses.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-muted-foreground">No pending approvals</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Request Owner</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">{expense.description}</TableCell>
                    <TableCell>{expense.userName}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-secondary rounded-md text-xs">
                        {expense.category}
                      </span>
                    </TableCell>
                    <TableCell className="font-bold text-foreground">
                      ${expense.convertedAmount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(expense)}
                          className="bg-status-approved hover:bg-status-approved/90"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(expense)}
                          className="border-status-rejected text-status-rejected hover:bg-status-rejected/10"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
