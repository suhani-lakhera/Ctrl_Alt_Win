import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, UserPlus } from "lucide-react";
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

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground mt-1">Manage organization users and their roles</p>
          </div>
          <Button size="lg" className="shadow-soft">
            <Plus className="w-5 h-5 mr-2" />
            Add New User
          </Button>
        </div>

        <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">All Users</h2>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name / Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Reporting Manager</TableHead>
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
                    <Select
                      value={user.role}
                      onValueChange={(value) => handleRoleChange(user.id, value as UserRole)}
                    >
                      <SelectTrigger className="w-[180px]">
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
                    <Select
                      value={user.reportingManagerId || "none"}
                      onValueChange={(value) => handleManagerChange(user.id, value)}
                      disabled={user.role === "admin"}
                    >
                      <SelectTrigger className="w-[220px]">
                        <SelectValue placeholder="Select manager" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Manager</SelectItem>
                        {managers
                          .filter((m) => m.id !== user.id)
                          .map((manager) => (
                            <SelectItem key={manager.id} value={manager.id}>
                              {manager.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
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
