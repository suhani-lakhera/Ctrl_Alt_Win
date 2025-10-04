export type UserRole = "employee" | "manager" | "admin";

export type ExpenseStatus = "draft" | "pending" | "approved" | "rejected";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  reportingManagerId?: string;
}

export interface Expense {
  id: string;
  userId: string;
  userName: string;
  description: string;
  category: string;
  amount: number;
  currency: string;
  convertedAmount: number;
  date: string;
  status: ExpenseStatus;
  remarks?: string;
}

export interface ApprovalRule {
  id: string;
  name: string;
  targetRole: UserRole | "all";
  isManagerApprover: boolean;
  approverSequence: ApprovalStep[];
  minimumApprovalPercentage: number;
}

export interface ApprovalStep {
  id: string;
  userId: string;
  required: boolean;
}
