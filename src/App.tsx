import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerApprovals from "./pages/ManagerApprovals";
import AdminUsers from "./pages/AdminUsers";
import AdminRules from "./pages/AdminRules";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard/expenses" element={<EmployeeDashboard />} />
          <Route path="/dashboard/approvals" element={<ManagerApprovals />} />
          <Route path="/dashboard/users" element={<AdminUsers />} />
          <Route path="/dashboard/rules" element={<AdminRules />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
