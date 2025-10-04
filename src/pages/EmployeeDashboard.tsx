import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Clock, CheckCircle, Plus } from "lucide-react";
import { mockExpenses } from "@/lib/mockData";
import { ExpenseModal } from "@/components/ExpenseModal";

export default function EmployeeDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userRole = JSON.parse(localStorage.getItem("currentUser") || "{}").role || "employee";

  const totalExpenses = mockExpenses.length;
  const pendingCount = mockExpenses.filter((e) => e.status === "pending").length;
  const totalApproved = mockExpenses
    .filter((e) => e.status === "approved")
    .reduce((sum, e) => sum + e.convertedAmount, 0);

  return (
    <DashboardLayout userRole={userRole}>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Expenses</h1>
            <p className="text-muted-foreground mt-1">Track and manage your expense submissions</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} size="lg" className="shadow-soft">
            <Plus className="w-5 h-5 mr-2" />
            New Expense
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard
            title="Total Expenses"
            value={totalExpenses}
            icon={FileText}
          />
          <StatCard
            title="Pending Approvals"
            value={pendingCount}
            icon={Clock}
          />
          <StatCard
            title="Total Approved"
            value={`$${totalApproved.toFixed(2)}`}
            icon={CheckCircle}
          />
        </div>

        {/* Expense History Table */}
        <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Expense History</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Original Amount</TableHead>
                <TableHead>Converted Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockExpenses.map((expense) => (
                <TableRow key={expense.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">
                    {new Date(expense.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-secondary rounded-md text-xs">
                      {expense.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    {expense.amount} {expense.currency}
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${expense.convertedAmount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={expense.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <ExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </DashboardLayout>
  );
}
