import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PurchaseOrderCard } from "@/components/PurchaseOrderCard";
import { ShippingTimeline } from "@/components/ShippingTimeline";
import { DocumentsSection } from "@/components/DocumentsSection";
import { mockPurchaseOrders } from "@/data/mockData";
import { PurchaseOrder, ShippingStatus } from "@/types/purchase-order";
import { Ship, Search, Filter, Plus } from "lucide-react";
import maritimeHeaderBg from "@/assets/maritime-header-bg.jpg";

const Index = () => {
  const [orders] = useState<PurchaseOrder[]>(mockPurchaseOrders);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ShippingStatus | "all">("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
    }
  };

  const getStatusCounts = () => {
    return orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<ShippingStatus, number>);
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header 
        className="relative bg-gradient-ocean shadow-wave sticky top-0 z-40 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.8), rgba(14, 165, 233, 0.9)), url(${maritimeHeaderBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Ship className="h-8 w-8 text-primary-foreground" />
              <h1 className="text-xl font-bold text-primary-foreground">
                Dashboard Logistica Marittima
              </h1>
            </div>
            <Button variant="secondary" size="sm" className="bg-white/10 text-primary-foreground border-white/20 hover:bg-white/20">
              <Plus className="h-4 w-4 mr-2" />
              Nuovo Ordine
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-card rounded-radius-lg border border-border p-4 shadow-ship">
            <div className="text-2xl font-bold text-card-foreground">{orders.length}</div>
            <div className="text-sm text-muted-foreground">Ordini Totali</div>
          </div>
          <div className="bg-card rounded-radius-lg border border-border p-4 shadow-ship">
            <div className="text-2xl font-bold text-status-in-progress-foreground">{statusCounts.production || 0}</div>
            <div className="text-sm text-muted-foreground">In Produzione</div>
          </div>
          <div className="bg-card rounded-radius-lg border border-border p-4 shadow-ship">
            <div className="text-2xl font-bold text-status-in-progress-foreground">{statusCounts.departed || 0}</div>
            <div className="text-sm text-muted-foreground">In Transito</div>
          </div>
          <div className="bg-card rounded-radius-lg border border-border p-4 shadow-ship">
            <div className="text-2xl font-bold text-status-completed-foreground">{statusCounts.arrived || 0}</div>
            <div className="text-sm text-muted-foreground">Arrivati</div>
          </div>
          <div className="bg-card rounded-radius-lg border border-border p-4 shadow-ship">
            <div className="text-2xl font-bold text-status-delayed-foreground">{statusCounts.delayed || 0}</div>
            <div className="text-sm text-muted-foreground">Ritardati</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca per numero ordine, fornitore o descrizione..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ShippingStatus | "all")}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti gli Stati</SelectItem>
              <SelectItem value="pending">In Attesa</SelectItem>
              <SelectItem value="production">In Produzione</SelectItem>
              <SelectItem value="departed">Partito</SelectItem>
              <SelectItem value="customs">Dogana</SelectItem>
              <SelectItem value="arrived">Arrivato</SelectItem>
              <SelectItem value="delayed">Ritardato</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Purchase Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <PurchaseOrderCard
              key={order.id}
              order={order}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Ship className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-card-foreground mb-2">Nessun ordine trovato</h3>
            <p className="text-muted-foreground">Prova ad aggiustare i criteri di ricerca</p>
          </div>
        )}
      </main>

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">
                  Ordine d'Acquisto #{selectedOrder.orderNumber}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="space-y-6">
                  <ShippingTimeline order={selectedOrder} />
                </div>
                
                <div className="space-y-6">
                  <DocumentsSection 
                    documents={selectedOrder.documents}
                    onViewDocument={(doc) => console.log('View document:', doc)}
                    onDownloadDocument={(doc) => console.log('Download document:', doc)}
                    onUploadDocument={() => console.log('Upload document')}
                  />
                  
                  {/* Order Summary */}
                  <div className="bg-muted rounded-radius-lg p-4">
                    <h4 className="font-semibold text-card-foreground mb-3">Riepilogo Ordine</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fornitore:</span>
                        <span className="text-card-foreground">{selectedOrder.supplier.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Valore Totale:</span>
                        <span className="text-card-foreground font-medium">
                          ${selectedOrder.totalValue.toLocaleString()} {selectedOrder.currency}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rotta:</span>
                        <span className="text-card-foreground">{selectedOrder.ports.departure} → {selectedOrder.ports.arrival}</span>
                      </div>
                      {selectedOrder.vessel && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Nave:</span>
                          <span className="text-card-foreground">{selectedOrder.vessel.name} ({selectedOrder.vessel.voyage})</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;