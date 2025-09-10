import { PurchaseOrder, Document } from "@/types/purchase-order";

// Mock documents
const mockDocuments: Document[] = [
  {
    id: "doc-1",
    name: "Commercial Invoice CI-2024-001.pdf",
    type: "commercial-invoice",
    uploadedAt: new Date("2024-01-15"),
    size: "245 KB"
  },
  {
    id: "doc-2", 
    name: "Packing List PL-2024-001.pdf",
    type: "packing-list",
    uploadedAt: new Date("2024-01-16"),
    size: "156 KB"
  },
  {
    id: "doc-3",
    name: "Proforma Invoice PI-2024-001.pdf", 
    type: "proforma-invoice",
    uploadedAt: new Date("2024-01-10"),
    size: "198 KB"
  }
];

// Mock purchase orders
export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: "po-1",
    orderNumber: "PO-2024-001",
    supplier: {
      name: "Shanghai Manufacturing Co.",
      country: "China",
      contact: "Liu Wei"
    },
    status: "departed",
    totalValue: 125000,
    currency: "USD",
    orderDate: new Date("2024-01-10"),
    timeline: {
      productionStart: new Date("2024-01-15"),
      productionEnd: new Date("2024-02-10"),
      departurePort: new Date("2024-02-15"),
      customsClearance: undefined,
      estimatedArrival: new Date("2024-03-20"),
      actualArrival: undefined
    },
    documents: mockDocuments,
    vessel: {
      name: "MSC Stella",
      voyage: "24012E"
    },
    ports: {
      departure: "Shanghai, China",
      arrival: "Los Angeles, USA"
    },
    description: "Electronic components and assembly parts"
  },
  {
    id: "po-2",
    orderNumber: "PO-2024-002",
    supplier: {
      name: "Vietnam Textiles Ltd.",
      country: "Vietnam", 
      contact: "Nguyen Tran"
    },
    status: "production",
    totalValue: 89500,
    currency: "USD",
    orderDate: new Date("2024-01-20"),
    timeline: {
      productionStart: new Date("2024-01-25"),
      productionEnd: undefined,
      departurePort: undefined,
      customsClearance: undefined,
      estimatedArrival: new Date("2024-04-05"),
      actualArrival: undefined
    },
    documents: [
      {
        id: "doc-4",
        name: "Proforma Invoice PI-2024-002.pdf",
        type: "proforma-invoice", 
        uploadedAt: new Date("2024-01-18"),
        size: "203 KB"
      }
    ],
    vessel: undefined,
    ports: {
      departure: "Ho Chi Minh City, Vietnam",
      arrival: "Long Beach, USA"
    },
    description: "Textile products and garments"
  },
  {
    id: "po-3",
    orderNumber: "PO-2024-003",
    supplier: {
      name: "Mumbai Industrial Corp.",
      country: "India",
      contact: "Raj Patel"
    },
    status: "customs",
    totalValue: 67800,
    currency: "USD",
    orderDate: new Date("2024-01-05"),
    timeline: {
      productionStart: new Date("2024-01-08"),
      productionEnd: new Date("2024-01-30"),
      departurePort: new Date("2024-02-03"),
      customsClearance: new Date("2024-02-28"),
      estimatedArrival: new Date("2024-03-05"),
      actualArrival: undefined
    },
    documents: [
      {
        id: "doc-5",
        name: "Bill of Lading BOL-2024-003.pdf",
        type: "bill-of-lading",
        uploadedAt: new Date("2024-02-03"),
        size: "167 KB"
      },
      {
        id: "doc-6",
        name: "Commercial Invoice CI-2024-003.pdf",
        type: "commercial-invoice",
        uploadedAt: new Date("2024-02-02"), 
        size: "234 KB"
      }
    ],
    vessel: {
      name: "COSCO Shanghai",
      voyage: "024W"
    },
    ports: {
      departure: "Mumbai, India",
      arrival: "Newark, USA"
    },
    description: "Machinery parts and tools"
  },
  {
    id: "po-4",
    orderNumber: "PO-2024-004",
    supplier: {
      name: "Bangkok Suppliers Co.",
      country: "Thailand",
      contact: "Somchai Jaidee"
    },
    status: "arrived",
    totalValue: 43200,
    currency: "USD",
    orderDate: new Date("2023-12-15"),
    timeline: {
      productionStart: new Date("2023-12-20"),
      productionEnd: new Date("2024-01-15"),
      departurePort: new Date("2024-01-20"),
      customsClearance: new Date("2024-02-10"),
      estimatedArrival: new Date("2024-02-15"),
      actualArrival: new Date("2024-02-14")
    },
    documents: [
      {
        id: "doc-7",
        name: "Delivery Receipt DR-2024-004.pdf",
        type: "other",
        uploadedAt: new Date("2024-02-14"),
        size: "98 KB"
      }
    ],
    vessel: {
      name: "Evergreen Star",
      voyage: "23051E" 
    },
    ports: {
      departure: "Laem Chabang, Thailand",
      arrival: "Seattle, USA"
    },
    description: "Food processing equipment"
  },
  {
    id: "po-5",
    orderNumber: "PO-2024-005",
    supplier: {
      name: "Korean Electronics Inc.", 
      country: "South Korea",
      contact: "Kim Min-jun"
    },
    status: "delayed",
    totalValue: 198000,
    currency: "USD",
    orderDate: new Date("2024-01-01"),
    timeline: {
      productionStart: new Date("2024-01-05"),
      productionEnd: new Date("2024-01-28"),
      departurePort: new Date("2024-02-01"),
      customsClearance: undefined,
      estimatedArrival: new Date("2024-03-01"),
      actualArrival: undefined
    },
    documents: [
      {
        id: "doc-8",
        name: "Delay Notification DN-2024-005.pdf",
        type: "other",
        uploadedAt: new Date("2024-02-25"),
        size: "143 KB"
      }
    ],
    vessel: {
      name: "Hyundai Mercury",
      voyage: "24003W"
    },
    ports: {
      departure: "Busan, South Korea", 
      arrival: "Oakland, USA"
    },
    description: "Consumer electronics and displays"
  }
];