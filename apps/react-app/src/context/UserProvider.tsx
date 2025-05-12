import { createContext, ReactNode, useState } from "react";

type UserContextType = {
    email: string;
    balance: number;
    updateEmail: (email: string) => void;
    updateBalance: (balance: number) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({children}: {children: ReactNode}) {
    const [email, setEmail] = useState("");
    const [balance, setBalance] = useState(0);

    const updateEmail = (email: string) => setEmail(email);
    const updateBalance = (balance: number) => setBalance(balance);

    return (
        <UserContext.Provider value={{email, balance, updateEmail, updateBalance}}>
            { children }
        </UserContext.Provider>
    )
}