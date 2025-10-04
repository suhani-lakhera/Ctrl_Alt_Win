import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Clock, CheckCircle, TrendingUp, Plus } from "lucide-react";
import { ExpenseModal } from "@/components/ExpenseModal";

// Define the structure of an Expense as returned by your API
interface Expense {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  currency: string;
  convertedAmount: number;
  status: 'pending' | 'approved' | 'rejected';
  // Add any other columns your 'expenses' table has
}

export default function EmployeeDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 1. STATE FOR REAL DATA AND FETCHING STATUS
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. DATA FETCHING EFFECT (FINAL FIX)
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        // NOTE: Ensure your backend server is running on port 8080
        const API_BASE_URL = 'http://localhost:5000/api'; 

        // Retrieve token from localStorage (adjust key if needed)
        const token = localStorage.getItem("token");

const response = await fetch(`${API_BASE_URL}/expenses`, { 
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // FINAL FIX: Read response as text first to avoid parsing errors, then manually parse JSON.
        const responseText = await response.text(); 
        
        if (!responseText) {
            // Handle case where API returns an empty response body
            setExpenses([]); 
        } else {
            const data: Expense[] = JSON.parse(responseText);
            setExpenses(data);
        }
        
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []); 

  const userRole = JSON.parse(localStorage.getItem("currentUser") || "{}").role || "employee";

  // 3. CALCULATIONS USING REAL DATA ('expenses' state)
  const totalExpenses = expenses.reduce((sum, e) => sum + e.convertedAmount, 0);
  const pendingCount = expenses.filter((e) => e.status === "pending").length;
  const approvedAmount = expenses
    .filter((e) => e.status === "approved")
    .reduce((sum, e) => sum + e.convertedAmount, 0);
  const thisMonthTotal = expenses
    .filter((e) => {
      const expenseDate = new Date(e.date);
      const now = new Date();
      return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
    })
    .reduce((sum, e) => sum + e.convertedAmount, 0);

  // 4. --- LOADING AND ERROR RETURN BLOCKS ---

  if (loading) {
    return (
      <DashboardLayout userRole={userRole}>
        <div className="text-xl text-primary mt-12">Loading expenses from server...</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout userRole={userRole}>
        <div className="text-xl text-red-500 mt-12">Error loading data: {error}</div>
        <div className="text-muted-foreground">Is the backend server running at http://localhost:5000?</div>
      </DashboardLayout>
    );
  }

  // 5. --- MAIN DASHBOARD CONTENT (FINAL RETURN) ---

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
              {expenses.slice(0, 5).map((expense) => (
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