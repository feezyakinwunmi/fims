// src/types/inventory.d.ts
export interface Item {
    _id: string;
    name: string;
    category: 'crops' | 'livestock' | 'tools' | 'supplies';
    openingStock: number;
    openingPrice: number;
    addedStock: number;
    addedPrice: number;
    totalStock: number;
    currentStock: number;
    activities: Activity[];
    price: number;
    quantity: number;
    totalSales: number;    // Add this
    totalPurchases: number; // Add this
  }
  
  export interface Activity {
    _id: string;
    type: 'issue' | 'sell' | 'stockup';
    quantity: number;
    name: string;
    price?: number;
    recipient: string;
    description: string;
    returned: boolean;
    date: Date;
    editedBy: string;
    unit: string 
  }