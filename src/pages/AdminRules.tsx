import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Settings2 } from "lucide-react";
import { mockUsers } from "@/lib/mockData";
import { toast } from "sonner";

interface ApproverStep {
  id: string;
  userId: string;
  required: boolean;
}

export default function AdminRules() {
  const [ruleName, setRuleName] = useState("");
  const [targetRole, setTargetRole] = useState("all");
  const [isManagerApprover, setIsManagerApprover] = useState(false);
  const [minApprovalPercentage, setMinApprovalPercentage] = useState("100");
  const [approverSteps, setApproverSteps] = useState<ApproverStep[]>([]);

  const addApproverStep = () => {
    setApproverSteps([
      ...approverSteps,
      { id: Date.now().toString(), userId: "", required: true },
    ]);
  };

  const removeApproverStep = (id: string) => {
    setApproverSteps(approverSteps.filter((step) => step.id !== id));
  };

  const updateApproverStep = (id: string, field: keyof ApproverStep, value: any) => {
    setApproverSteps(
      approverSteps.map((step) =>
        step.id === id ? { ...step, [field]: value } : step
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Approval rule created successfully!");
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6 animate-fade-in max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Approval Rules</h1>
          <p className="text-muted-foreground mt-1">
            Configure complex approval workflows for your organization
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="shadow-soft border-border">
            <CardHeader className="border-b border-border">
              <div className="flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-primary" />
                <CardTitle>Create New Approval Rule</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ruleName">Rule Name</Label>
                  <Input
                    id="ruleName"
                    placeholder="e.g., Standard Employee Approval"
                    value={ruleName}
                    onChange={(e) => setRuleName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetRole">Target Role</Label>
                  <Select value={targetRole} onValueChange={setTargetRole}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Employees</SelectItem>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2 p-4 bg-muted/50 rounded-lg">
                  <Checkbox
                    id="managerApprover"
                    checked={isManagerApprover}
                    onCheckedChange={(checked) =>
                      setIsManagerApprover(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="managerApprover"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Direct manager is automatically the first approver (Step 1)
                  </Label>
                </div>
              </div>

              {/* Approver Sequence */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">
                    Approver Sequence{" "}
                    {isManagerApprover && (
                      <span className="text-sm font-normal text-muted-foreground">
                        (Step 1 is auto-assigned to manager)
                      </span>
                    )}
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addApproverStep}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Step
                  </Button>
                </div>

                <div className="space-y-3">
                  {approverSteps.map((step, index) => (
                    <Card key={step.id} className="bg-secondary/30">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg text-primary font-semibold text-sm">
                            {isManagerApprover ? index + 2 : index + 1}
                          </div>

                          <div className="flex-1 grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-xs">Approver</Label>
                              <Select
                                value={step.userId}
                                onValueChange={(value) =>
                                  updateApproverStep(step.id, "userId", value)
                                }
                                required
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select user" />
                                </SelectTrigger>
                                <SelectContent>
                                  {mockUsers.map((user) => (
                                    <SelectItem key={user.id} value={user.id}>
                                      {user.name} ({user.role})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="flex items-end">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`required-${step.id}`}
                                  checked={step.required}
                                  onCheckedChange={(checked) =>
                                    updateApproverStep(step.id, "required", checked)
                                  }
                                />
                                <Label
                                  htmlFor={`required-${step.id}`}
                                  className="text-sm cursor-pointer"
                                >
                                  Required
                                </Label>
                              </div>
                            </div>
                          </div>

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeApproverStep(step.id)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {approverSteps.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      No approval steps added yet. Click "Add Step" to define your workflow.
                    </div>
                  )}
                </div>
              </div>

              {/* Conditional Approval */}
              <div className="space-y-2">
                <Label htmlFor="minPercentage">
                  Minimum Approval Percentage (%)
                </Label>
                <Input
                  id="minPercentage"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="100"
                  value={minApprovalPercentage}
                  onChange={(e) => setMinApprovalPercentage(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Percentage of approvers who must approve for the expense to be approved
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Create Rule</Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  );
}
