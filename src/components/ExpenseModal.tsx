import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Loader2, Sparkles } from "lucide-react";
import { CURRENCIES, EXPENSE_CATEGORIES } from "@/lib/mockData";
import { toast } from "sonner";

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExpenseModal = ({ isOpen, onClose }: ExpenseModalProps) => {
  const [isOCRLoading, setIsOCRLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    date: "",
    category: "",
    amount: "",
    currency: "",
    remarks: "",
  });

  const simulateOCR = () => {
    setIsOCRLoading(true);
    setTimeout(() => {
      setFormData({
        description: "Team dinner at Italian restaurant",
        date: "2025-10-03",
        category: "Meals & Entertainment",
        amount: "142.50",
        currency: "EUR",
        remarks: "Quarterly team celebration",
      });
      setIsOCRLoading(false);
      toast.success("Receipt scanned successfully! Fields auto-populated.");
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Expense submitted for approval!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Submit New Expense</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OCR Feature */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border-2 border-primary/20">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">AI-Powered Receipt Scanning</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your receipt and let our AI automatically extract the details
                </p>
                <Button
                  type="button"
                  onClick={simulateOCR}
                  disabled={isOCRLoading}
                  variant="outline"
                  className="border-primary/20 hover:bg-primary/10"
                >
                  {isOCRLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Scanning Receipt...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Receipt / Simulate OCR
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter expense description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {EXPENSE_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => setFormData({ ...formData, currency: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((curr) => (
                    <SelectItem key={curr.code} value={curr.code}>
                      {curr.code} - {curr.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="remarks">Remarks (Optional)</Label>
              <Textarea
                id="remarks"
                placeholder="Additional notes"
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Submit for Approval
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
