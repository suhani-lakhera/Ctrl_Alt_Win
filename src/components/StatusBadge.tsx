import { ExpenseStatus } from "@/types";
import { Clock, Check, X, FileEdit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: ExpenseStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = {
    draft: {
      icon: FileEdit,
      label: "Draft",
      className: "bg-status-draft/10 text-status-draft border-status-draft/20",
    },
    pending: {
      icon: Clock,
      label: "Waiting Approval",
      className: "bg-status-pending/10 text-status-pending border-status-pending/20 animate-pulse-subtle",
    },
    approved: {
      icon: Check,
      label: "Approved",
      className: "bg-status-approved/10 text-status-approved border-status-approved/20",
    },
    rejected: {
      icon: X,
      label: "Rejected",
      className: "bg-status-rejected/10 text-status-rejected border-status-rejected/20",
    },
  };

  const { icon: Icon, label, className } = config[status];

  return (
    <Badge variant="outline" className={className}>
      <Icon className="w-3 h-3 mr-1" />
      {label}
    </Badge>
  );
};
