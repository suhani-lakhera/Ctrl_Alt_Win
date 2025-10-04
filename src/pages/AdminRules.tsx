import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Settings2, Check } from "lucide-react";
import { mockUsers, mockApprovalRules } from "@/lib/mockData";

export default function AdminRules() {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Approval Rules</h1>
          <p className="text-muted-foreground mt-1">
            Configure approval workflows and rules
          </p>
        </div>

        {/* Display Existing Rules */}
        <div className="space-y-4">
          {mockApprovalRules.map((rule) => (
            <Card key={rule.id} className="shadow-soft border-border">
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{rule.name}</CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Target Role: {rule.targetRole === "all" ? "Employee" : rule.targetRole}</span>
                      {rule.isManagerApprover && (
                        <span className="flex items-center gap-1">
                          <Check className="w-4 h-4 text-primary" />
                          Manager as Primary Approver: ✓
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                      Active
                    </span>
                    <Button variant="ghost" size="icon">
                      <Settings2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div>
                  <Label className="text-sm font-semibold mb-3 block">Approval Steps:</Label>
                  <div className="space-y-2">
                    {rule.isManagerApprover && (
                      <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg text-primary font-semibold text-sm">
                          1
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Manager Approval</p>
                          <p className="text-xs text-muted-foreground">
                            {rule.minimumApprovalPercentage}% approval required
                          </p>
                        </div>
                      </div>
                    )}
                    {rule.approverSequence.length > 0 && rule.approverSequence.map((step, index) => {
                      const approver = mockUsers.find(u => u.id === step.userId);
                      return (
                        <div key={step.id} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg text-primary font-semibold text-sm">
                            {rule.isManagerApprover ? index + 2 : index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{approver?.role === "admin" ? "Admin Approval" : approver?.name || "Unknown User"}</p>
                            <p className="text-xs text-muted-foreground">
                              {rule.minimumApprovalPercentage}% approval required
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
