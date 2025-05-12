import { createContext, ReactNode, useState } from "react";

type Transaction = {
    id: number,
    amount: number,
    senderId: string,
    receiverId: string,
    status: string,
    createdAt: string,
    updatedAt: string
}

type TransactionsContextType = {
    txns: Transaction[];
    setTxns: (txns: Transaction[]) => void;
}

export const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export function TransactionsProvider({children}: {children: ReactNode}) {
    const [txns, setTransactions] = useState<Transaction[]>([]);

    const setTxns = (txns: Transaction[]) => setTransactions(txns);

    return (
        <TransactionsContext.Provider value={{txns, setTxns}}>
            {children}
        </TransactionsContext.Provider>
    )
}