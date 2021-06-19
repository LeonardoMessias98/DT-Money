import { TransactionsProvider } from "./useTransactions";

const Provider = ({ children }: any) => (
  <TransactionsProvider>
    {children}
  </TransactionsProvider>
)

export default Provider;