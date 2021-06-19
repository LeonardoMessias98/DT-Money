import { ReactNode } from "react";

export interface Transaction {
  id: number,
  title: string,
  type: string,
  category: string,
  amount: number,
  createdAt: string,
}

export type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

export interface TransactionsContextProps {
  transactions: Array<Transaction> | undefined;
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

export interface TransactionsProviderProps {
  children: ReactNode
}
