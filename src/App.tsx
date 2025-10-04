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
import { useState, useEffect } from 'react';
// Assuming you have other imports (like './App.css')

// Define the type for the data you expect from the API
// You'll need to know the column names for your 'currencies' table
interface Currency {
  id: number;
  name: string; // Or whatever your column names are
  code: string;
}

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


const queryClient = new QueryClient();


export default App;
