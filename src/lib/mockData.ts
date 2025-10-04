import { User, Expense, ApprovalRule } from "@/types";

export const CURRENCIES = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "INR", name: "Indian Rupee" },
  { code: "JPY", name: "Japanese Yen" },
];

export const EXPENSE_CATEGORIES = [
  "Travel",
  "Meals & Entertainment",
  "Office Supplies",
  "Software & Subscriptions",
  "Professional Services",
  "Other",
];

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@company.com",
    role: "employee",
    reportingManagerId: "2",
  },
  {
    id: "2",
    name: "Sarah Manager",
    email: "sarah@company.com",
    role: "manager",
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@company.com",
    role: "admin",
  },
];

export const mockExpenses: Expense[] = [
  {
    id: "1",
    userId: "1",
    userName: "John Doe",
    description: "Flight to NYC for client meeting",
    category: "Travel",
    amount: 450,
    currency: "USD",
    convertedAmount: 450,
    date: "2025-10-01",
    status: "approved",
  },
  {
    id: "2",
    userId: "1",
    userName: "John Doe",
    description: "Team dinner",
    category: "Meals & Entertainment",
    amount: 85,
    currency: "EUR",
    convertedAmount: 92.5,
    date: "2025-10-02",
    status: "pending",
  },
  {
    id: "3",
    userId: "1",
    userName: "John Doe",
    description: "Office supplies",
    category: "Office Supplies",
    amount: 35,
    currency: "USD",
    convertedAmount: 35,
    date: "2025-09-28",
    status: "draft",
  },
];

export const mockApprovalRules: ApprovalRule[] = [
  {
    id: "1",
    name: "Standard Employee Approval",
    targetRole: "employee",
    isManagerApprover: true,
    approverSequence: [
      { id: "1", userId: "3", required: true },
    ],
    minimumApprovalPercentage: 100,
  },
];
