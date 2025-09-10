import { PurchaseOrder } from "@/types/purchase-order";
import { format } from "date-fns";
import { Package, Ship, MapPin, Warehouse, CheckCircle, Clock } from "lucide-react";

interface ShippingTimelineProps {
  order: PurchaseOrder;
}

export function ShippingTimeline({ order }: ShippingTimelineProps) {
  const timelineSteps = [
    {
      id: 'production',
      label: 'Produzione',
      icon: Package,
      startDate: order.timeline.productionStart,
      endDate: order.timeline.productionEnd,
      status: getStepStatus('production', order)
    },
    {
      id: 'departure',
      label: 'Partenza Porto',
      icon: Ship,
      startDate: order.timeline.departurePort,
      endDate: null,
      status: getStepStatus('departure', order)
    },
    {
      id: 'customs',
      label: 'Sdoganamento',
      icon: MapPin,
      startDate: order.timeline.customsClearance,
      endDate: null,
      status: getStepStatus('customs', order)
    },
    {
      id: 'arrival',
      label: 'Arrivo Magazzino',
      icon: Warehouse,
      startDate: order.timeline.actualArrival || order.timeline.estimatedArrival,
      endDate: null,
      status: getStepStatus('arrival', order)
    }
  ];

  function getStepStatus(step: string, order: PurchaseOrder): 'completed' | 'current' | 'pending' {
    const statusOrder = ['pending', 'production', 'departed', 'customs', 'arrived'];
    const currentIndex = statusOrder.indexOf(order.status);
    
    switch (step) {
      case 'production':
        return currentIndex >= 1 ? 'completed' : currentIndex === 0 ? 'current' : 'pending';
      case 'departure':
        return currentIndex >= 2 ? 'completed' : currentIndex === 1 ? 'current' : 'pending';
      case 'customs':
        return currentIndex >= 3 ? 'completed' : currentIndex === 2 ? 'current' : 'pending';
      case 'arrival':
        return currentIndex >= 4 ? 'completed' : currentIndex === 3 ? 'current' : 'pending';
      default:
        return 'pending';
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-card-foreground">Cronologia Spedizione</h3>
      
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border"></div>
        
        <div className="space-y-6">
          {timelineSteps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            
            return (
              <div key={step.id} className="relative flex items-start gap-4">
                <div className={`
                  relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 
                  ${isCompleted 
                    ? 'bg-status-completed border-status-completed-foreground text-status-completed-foreground' 
                    : isCurrent 
                    ? 'bg-status-in-progress border-status-in-progress-foreground text-status-in-progress-foreground animate-pulse' 
                    : 'bg-background border-muted-foreground text-muted-foreground'
                  }
                `}>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : isCurrent ? (
                    <Clock className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-medium ${
                      isCompleted || isCurrent ? 'text-card-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.label}
                    </h4>
                    
                    {step.startDate && (
                      <span className="text-xs text-muted-foreground">
                        {format(step.startDate, 'MMM dd, yyyy')}
                      </span>
                    )}
                  </div>
                  
                  {step.endDate && step.startDate && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Durata: {Math.ceil((step.endDate.getTime() - step.startDate.getTime()) / (1000 * 60 * 60 * 24))} giorni
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}