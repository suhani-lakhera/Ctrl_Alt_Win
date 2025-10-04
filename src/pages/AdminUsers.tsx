import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, UserCheck, UserCog, Shield, Plus, Pencil } from "lucide-react";
import { mockUsers } from "@/lib/mockData";
import { User, UserRole } from "@/types";
import { toast } from "sonner";

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    toast.success("User role updated successfully");
  };

  const handleManagerChange = (userId: string, managerId: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, reportingManagerId: managerId } : u)));
    toast.success("Reporting manager updated successfully");
  };

  const managers = users.filter((u) => u.role === "manager" || u.role === "admin");
  
  const totalUsers = users.length;
  const employees = users.filter(u => u.role === "employee").length;
  const managersCount = users.filter(u => u.role === "manager").length;
  const admins = users.filter(u => u.role === "admin").length;

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground mt-1">Manage users, roles, and reporting structure</p>
          </div>
          <Button size="lg" className="shadow-soft">
            <Plus className="w-5 h-5 mr-2" />
            Add New User
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <StatCard title="Total Users" value={totalUsers} icon={Users} />
          <StatCard title="Employees" value={employees} icon={UserCheck} />
          <StatCard title="Managers" value={managersCount} icon={UserCog} />
          <StatCard title="Admins" value={admins} icon={Shield} />
        </div>

        {/* User Management Table */}
        <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">All Users</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Reporting Manager</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-foreground">
                      {user.id === "1" || user.id === "2" ? "Marketing" : "Engineering"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(value) => handleRoleChange(user.id, value as UserRole)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employee">Employee</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {user.role !== "admin" ? (
                      <Select
                        value={user.reportingManagerId || "none"}
                        onValueChange={(value) => handleManagerChange(user.id, value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select manager" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">—</SelectItem>
                          {managers
                            .filter((m) => m.id !== user.id)
                            .map((manager) => (
                              <SelectItem key={manager.id} value={manager.id}>
                                {manager.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                      active
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
