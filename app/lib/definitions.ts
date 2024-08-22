// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
  createdAt: string; 
};

export type LatestInvoice = {
  id: string;
  name: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
  email: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

// New Types for Suppliers and Apple Varieties
export type Supplier = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  type: string[];
};


export type Item = {
  id: string;
  name: string;
  supplier_type: string;
  supplier_id: string;
  quantity: number;
  uom: string;
  price: number;
  appleDetails?: {
    organic_grown: boolean;
    pesticides_used: boolean;
    pesticide_type?: string;
    last_pesticide_date?: string;
    animals_in_orchard: boolean;
  };
};

export type FormattedItemsTable = {
  id: string;
  name: string;
  supplier_type: string;
  supplier_id: string;
  quantity: number;
  uom: string;
  price: number;
};

export type SupplierAppleVariety = {
  id: string;
  supplier_id: string;
  apple_variety_id: string;
  quantity: number;
};

export type AppleVarieties = {
  id: string;
  name: string;
  description: string;
  harvest_season: string;
};

//orchard plot gui

export type OrchardPlot = {
  id: string;
  name: string;
  trees: Tree[];
};

export type Tree = {
  id: string;
  variety: string;
  rootstock: string;
  yearPlanted: number;
  row: number;
  column: number;
  status: 'healthy' | 'diseased' | 'treated' | 'removed' | null;
  lastPruned: Date | null;
  lastFertilized: Date | null;
  lastPesticide: Date | null;
  notes: string | null;
  yield: number | null;
  lastHarvestDate: Date | null;
};

export type Plot = {
  id: string;
  name: string;
  rows: number;
  columns: number;
}