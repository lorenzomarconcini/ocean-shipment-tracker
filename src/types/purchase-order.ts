export type ShippingStatus = 'pending' | 'production' | 'departed' | 'customs' | 'arrived' | 'delayed';

export interface Document {
  id: string;
  name: string;
  type: 'commercial-invoice' | 'packing-list' | 'proforma-invoice' | 'bill-of-lading' | 'other';
  url?: string;
  uploadedAt: Date;
  size?: string;
}

export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplier: {
    name: string;
    country: string;
    contact: string;
  };
  status: ShippingStatus;
  totalValue: number;
  currency: string;
  orderDate: Date;
  timeline: {
    productionStart?: Date;
    productionEnd?: Date;
    departurePort?: Date;
    customsClearance?: Date;
    estimatedArrival?: Date;
    actualArrival?: Date;
  };
  documents: Document[];
  vessel?: {
    name: string;
    voyage: string;
  };
  ports: {
    departure: string;
    arrival: string;
  };
  description: string;
}