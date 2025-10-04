import { ReactNode, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DollarSign, FileText, CheckSquare, Users, Settings, LogOut, Menu, X } from "lucide-react";
import { UserRole } from "@/types";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: UserRole;
}

const navigationConfig = {
  employee: [
    { path: "/dashboard/expenses", label: "My Expenses", icon: FileText },
  ],
  manager: [
    { path: "/dashboard/approvals", label: "Approvals", icon: CheckSquare },
    { path: "/dashboard/expenses", label: "My Expenses", icon: FileText },
  ],
  admin: [
    { path: "/dashboard/users", label: "User Management", icon: Users },
    { path: "/dashboard/rules", label: "Approval Rules", icon: Settings },
    { path: "/dashboard/approvals", label: "Approvals", icon: CheckSquare },
    { path: "/dashboard/expenses", label: "My Expenses", icon: FileText },
  ],
};

export const DashboardLayout = ({ children, userRole }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/auth");
  };

  const navItems = navigationConfig[userRole];

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 bg-sidebar flex-col border-r border-sidebar-border">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <DollarSign className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">ExpenseFlow AI</h1>
              <p className="text-xs text-sidebar-foreground/70">Enterprise</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="p-3 bg-sidebar-accent rounded-lg mb-3">
            <p className="text-sm font-medium text-sidebar-foreground">{currentUser.name}</p>
            <p className="text-xs text-sidebar-foreground/70 capitalize">{userRole}</p>
          </div>
          <Button
            variant="outline"
            className="w-full border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border p-4 flex items-center justify-between lg:justify-end">
          <button
            className="lg:hidden p-2 hover:bg-muted rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="hidden lg:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-destructive/20 text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-sidebar border-b border-sidebar-border animate-fade-in">
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6 max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};
