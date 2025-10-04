import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign } from "lucide-react";
import { CURRENCIES } from "@/lib/mockData";
import { toast } from "sonner";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const role = formData.get("role") as string || "employee";
    const name = formData.get("name") as string || "User";
    
    localStorage.setItem("currentUser", JSON.stringify({ 
      id: Math.random().toString(36).substr(2, 9), 
      role,
      name 
    }));
    toast.success(isSignUp ? "Account created successfully!" : "Welcome back!");
    
    // Navigate based on role
    if (role === "employee") {
      navigate("/dashboard/expenses");
    } else if (role === "manager") {
      navigate("/dashboard/approvals");
    } else {
      navigate("/dashboard/approvals");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar p-12 flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary rounded-xl">
            <DollarSign className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-sidebar-foreground">ExpenseFlow AI</h1>
            <p className="text-sidebar-foreground/70 text-sm">Smart expense management</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-sidebar-foreground">
              Streamline your expense workflow
            </h2>
            <p className="text-sidebar-foreground/70">
              AI-powered receipt scanning, intelligent approval routing, and real-time expense tracking all in one place.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="space-y-1">
              <p className="text-3xl font-bold text-primary">95%</p>
              <p className="text-sm text-sidebar-foreground/70">Faster processing</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-primary">100%</p>
              <p className="text-sm text-sidebar-foreground/70">Accuracy rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h2>
            <p className="text-muted-foreground mt-2">
              {isSignUp ? "Set up your company expense system" : "Sign in to your account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="Enter your email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Enter your password" required />
            </div>

            {isSignUp && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select name="role" defaultValue="employee" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Base Currency</Label>
                  <Select name="currency" defaultValue="USD" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <Button type="submit" className="w-full" size="lg">
              {isSignUp ? "Create Account" : "Sign In"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-primary hover:underline"
              >
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
