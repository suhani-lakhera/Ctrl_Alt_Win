import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { FileText, DollarSign, TrendingUp, Check, X, Eye } from "lucide-react";
import { mockExpenses } from "@/lib/mockData";
import { Expense } from "@/types";
import { toast } from "sonner";

export default function ManagerApprovals() {
  const userRole = JSON.parse(localStorage.getItem("currentUser") || "{}").role || "manager";
  const [expenses, setExpenses] = useState(mockExpenses.filter((e) => e.status === "pending"));

  const totalAmount = expenses.reduce((sum, e) => sum + e.convertedAmount, 0);
  const avgAmount = expenses.length > 0 ? totalAmount / expenses.length : 0;

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

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard
            title="Pending Requests"
            value={expenses.length}
            icon={FileText}
          />
          <StatCard
            title="Total Amount"
            value={`$${totalAmount.toFixed(2)}`}
            icon={DollarSign}
          />
          <StatCard
            title="Avg. Amount"
            value={`$${avgAmount.toFixed(2)}`}
            icon={TrendingUp}
          />
        </div>

        {/* Pending Approvals */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Pending Approvals</h2>
          
          {expenses.length === 0 ? (
            <div className="bg-card rounded-xl shadow-soft border border-border p-12 text-center">
              <p className="text-muted-foreground">No pending approvals</p>
            </div>
          ) : (
            <div className="space-y-4">
              {expenses.map((expense) => (
                <div key={expense.id} className="bg-card rounded-xl shadow-soft border border-border p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {expense.description}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Submitted by {expense.userName} on {new Date(expense.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-foreground">
                          {expense.currency} {expense.convertedAmount.toFixed(2)}
                        </p>
                      </div>
                      <div className="px-3 py-1 bg-status-pending/10 text-status-pending rounded-full text-sm font-medium">
                        Pending Approval
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 py-4 border-t border-b border-border">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Date:</p>
                      <p className="font-medium">{new Date(expense.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Category:</p>
                      <p className="font-medium">{expense.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Receipt:</p>
                      <p className="text-primary font-medium">✓ Attached</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Employee:</p>
                      <p className="font-medium">{expense.userName}</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(expense)}
                      className="gap-2 border-status-rejected text-status-rejected hover:bg-status-rejected/10"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleApprove(expense)}
                      className="gap-2 bg-primary hover:bg-primary/90"
                    >
                      <Check className="w-4 h-4" />
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
