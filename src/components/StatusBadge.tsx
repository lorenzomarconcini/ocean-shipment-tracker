import { Badge } from "@/components/ui/badge";
import { ShippingStatus } from "@/types/purchase-order";
import { Clock, Package, Ship, MapPin, CheckCircle, AlertTriangle } from "lucide-react";

interface StatusBadgeProps {
  status: ShippingStatus;
  className?: string;
}

const statusConfig = {
  pending: {
    label: "Pending",
    variant: "secondary" as const,
    icon: Clock,
    className: "bg-status-pending text-status-pending-foreground border-status-pending-foreground/20"
  },
  production: {
    label: "In Production",
    variant: "default" as const,
    icon: Package,
    className: "bg-status-in-progress text-status-in-progress-foreground border-status-in-progress-foreground/20"
  },
  departed: {
    label: "Departed",
    variant: "default" as const,
    icon: Ship,
    className: "bg-status-in-progress text-status-in-progress-foreground border-status-in-progress-foreground/20"
  },
  customs: {
    label: "Customs",
    variant: "default" as const,
    icon: MapPin,
    className: "bg-status-in-progress text-status-in-progress-foreground border-status-in-progress-foreground/20"
  },
  arrived: {
    label: "Arrived",
    variant: "default" as const,
    icon: CheckCircle,
    className: "bg-status-completed text-status-completed-foreground border-status-completed-foreground/20"
  },
  delayed: {
    label: "Delayed",
    variant: "destructive" as const,
    icon: AlertTriangle,
    className: "bg-status-delayed text-status-delayed-foreground border-status-delayed-foreground/20"
  }
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant={config.variant} 
      className={`${config.className} ${className} flex items-center gap-1.5 font-medium px-3 py-1.5`}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </Badge>
  );
}