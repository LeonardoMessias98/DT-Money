import { createContext, useContext, useEffect, useState } from 'react';
import { api } from 'services/api';

import { 
  Transaction, 
  TransactionInput, 
  TransactionsContextProps, 
  TransactionsProviderProps 
} from './types'

export const TransactionsContext = createContext({} as TransactionsContextProps);

export function TransactionsProvider({ children } : TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>();

  useEffect(() => {
    async function getTransactions() {
      const response = await api.get('/transactions');

      setTransactions(response.data.transactions);
    }

    getTransactions();
  }, []);

  async function createTransaction(transaction: TransactionInput) {
    const response = await api.post('/transactions', transaction);

    const newTransaction = response.data.transaction;

    setTransactions(oldTransactions => oldTransactions 
      ? [...oldTransactions, newTransaction]
      : newTransaction  
    )
  }


  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      { children }
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => {
  const context = useContext(TransactionsContext);

  return context;
}