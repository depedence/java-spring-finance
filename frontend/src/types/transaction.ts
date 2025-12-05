export type TransactionType = "INCOME" | "EXPENSE";

export interface Transaction {
  id?: number;
  type: TransactionType;
  amount: number;
  category: string;
  description?: string;
  date: string; // ISO date e.g. "2024-12-15"
  createdAt?: string;
}
