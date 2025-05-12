import { ReactNode } from "react"
import { UserProvider } from "./UserProvider"
import { TransactionsProvider } from "./TransactionsProvider"

export function AppContextProvider({children}: {children: ReactNode}) {
    return (
        <UserProvider>
            <TransactionsProvider>
                {children}
            </TransactionsProvider>
        </UserProvider>   
    )
}