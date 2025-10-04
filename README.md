# Ctrl_Alt_Win: Expense Management System

A full-stack web application to streamline expense reporting, from submission to multi-level approvals, with transparency, flexibility, and automation.

---

## Overview / Motivation

Manual expense reimbursement is often slow, error-prone, and lacks accountability.  
This system empowers companies to automate workflows, enforce conditional rules, and give real-time visibility into expenses.

---

## Key Features

### Role-Based Access Control  
| Role     | Capabilities |
|----------|--------------|
| **Admin**    | Create/manage users, assign roles & manager relationships, define approval workflows, override approvals |
| **Manager**  | View pending expenses, approve/reject with comments, see amounts in company’s currency |
| **Employee** | Submit new expense claims, view status/history |

### Expense Submission  
- Employees can submit claims with fields like:  
  - Amount (in any currency)  
  - Category, Description, Date  
  - Upload receipt (future OCR support)  
- System converts foreign currency → company default using exchange API.

### Multi-Level Approval Workflows  
- Define a chain of approvers (e.g. Manager → Finance → Director).  
- Expense moves to next level only after current approver acts.

### Conditional Approval Rules  
- **Percentage Rule**: e.g. If ≥ 60 % of approvers approve, it’s approved.  
- **Key Approver Rule**: e.g. If CFO approves, auto-approve instantly.  
- **Hybrid Rules**: Combine percentage + key approver logic.

### (Planned) OCR for Receipts  
- Scan receipts → auto-populate amount, date, merchant name, expense lines, etc.

---

## Tech Stack

- **Backend**: Node.js + Express  
- **Database**: MySQL  
- **Authentication / Authorization**: JWT + role-based checks  
- **Frontend**: React.js, Next.js, TypeScript, HTML, CSS

---

## API Integrations

- **Country & Currency Data**:  
  `https://restcountries.com/v3.1/all?fields=name,currencies`  
- **Currency Conversion Rates**:  
  `https://api.exchangerate-api.com/v4/latest/{BASE_CURRENCY}`  

---

## Authentication & Authorization

- **Login (`POST /login`)**  
  - Validates email & password.  
  - Returns JWT with user details, role, and company info.  
  - Frontend displays different dashboards based on role (Admin / Manager / Employee).  

- **Protected Routes**  
  - Middleware verifies JWT.  
  - Role checks enforce access control for Admin, Manager, and Employee-specific actions.  

---

## Workflow / Use Cases

- **Employee**  
  - Logs in → fills expense form → submits → sees “Pending” status  
- **Manager**  
  - Logs in → sees list of pending expenses → approves or rejects (with comment)  
- **Admin**  
  - Sets up user accounts, assigns manager relationships, defines approval workflows, views all company expenses  

With **multi-level + conditional** rules in place, the system will route approval accordingly and automatically finalize based on rules.
