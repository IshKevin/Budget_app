export type AccountType = "BANK" | "MOBILE_MONEY" | "CASH";



export interface Transaction {
  id: number;
  accountId: number;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  description: string;
  date: Date;
  categoryId?: number;
}