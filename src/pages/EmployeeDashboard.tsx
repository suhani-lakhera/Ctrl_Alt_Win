import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Clock, CheckCircle, TrendingUp, Plus } from "lucide-react";
import { mockExpenses } from "@/lib/mockData";
import { ExpenseModal } from "@/components/ExpenseModal";

export default function EmployeeDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userRole = JSON.parse(localStorage.getItem("currentUser") || "{}").role || "employee";

  const totalExpenses = mockExpenses.reduce((sum, e) => sum + e.convertedAmount, 0);
  const pendingCount = mockExpenses.filter((e) => e.status === "pending").length;
  const approvedAmount = mockExpenses
    .filter((e) => e.status === "approved")
    .reduce((sum, e) => sum + e.convertedAmount, 0);
  const thisMonthTotal = mockExpenses
    .filter((e) => {
      const expenseDate = new Date(e.date);
      const now = new Date();
      return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
    })
    .reduce((sum, e) => sum + e.convertedAmount, 0);

  return (
    <DashboardLayout userRole={userRole}>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Expense Dashboard</h1>
            <p className="text-muted-foreground mt-1">Track and manage your expenses</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} size="lg" className="shadow-soft">
            <Plus className="w-5 h-5 mr-2" />
            New Expense
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <StatCard
            title="Total Expenses"
            value={`$${totalExpenses.toFixed(2)}`}
            icon={DollarSign}
            trend="+12%"
          />
          <StatCard
            title="Pending Approvals"
            value={pendingCount}
            icon={Clock}
          />
          <StatCard
            title="Approved Amount"
            value={`$${approvedAmount.toFixed(2)}`}
            icon={CheckCircle}
          />
          <StatCard
            title="This Month"
            value={`$${thisMonthTotal.toFixed(2)}`}
            icon={TrendingUp}
            trend="+8%"
          />
        </div>

        {/* Recent Expenses Table */}
        <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Recent Expenses</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockExpenses.slice(0, 5).map((expense) => (
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
                  <TableCell className="font-semibold">
                    {expense.currency} {expense.amount.toFixed(2)}
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
