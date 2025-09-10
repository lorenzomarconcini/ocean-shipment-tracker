import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PurchaseOrder } from "@/types/purchase-order";
import { StatusBadge } from "./StatusBadge";
import { Calendar, MapPin, FileText, Eye } from "lucide-react";
import { format } from "date-fns";

interface PurchaseOrderCardProps {
  order: PurchaseOrder;
  onViewDetails: (orderId: string) => void;
}

export function PurchaseOrderCard({ order, onViewDetails }: PurchaseOrderCardProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const getNextMilestone = () => {
    const { timeline } = order;
    if (!timeline.productionStart) return { label: "Production Start", date: timeline.productionStart };
    if (!timeline.departurePort) return { label: "Port Departure", date: timeline.departurePort };
    if (!timeline.customsClearance) return { label: "Customs Clearance", date: timeline.customsClearance };
    if (!timeline.actualArrival) return { label: "Estimated Arrival", date: timeline.estimatedArrival };
    return null;
  };

  const nextMilestone = getNextMilestone();

  return (
    <Card className="hover:shadow-wave transition-all duration-300 border-border/50 bg-card">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-card-foreground">
              PO #{order.orderNumber}
            </CardTitle>
            <p className="text-sm text-muted-foreground font-medium">
              {order.supplier.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {order.supplier.country}
            </p>
          </div>
          <StatusBadge status={order.status} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total Value</span>
          <span className="font-semibold text-card-foreground">
            {formatCurrency(order.totalValue, order.currency)}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{order.ports.departure} → {order.ports.arrival}</span>
          </div>
          
          {nextMilestone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                Next: {nextMilestone.label}
                {nextMilestone.date && ` - ${format(nextMilestone.date, 'MMM dd, yyyy')}`}
              </span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>{order.documents.length} documents</span>
          </div>
        </div>

        <div className="pt-2">
          <Button 
            onClick={() => onViewDetails(order.id)}
            variant="outline" 
            size="sm" 
            className="w-full bg-gradient-ocean text-primary-foreground border-none hover:opacity-90"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}