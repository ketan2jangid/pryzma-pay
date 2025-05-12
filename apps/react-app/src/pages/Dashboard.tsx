import { useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import Button from "../components/Button";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Endpoints, StorageKeys } from "../config";
import { MdCallMade, MdCallReceived } from "react-icons/md";
import { formatDateTimeLocal } from "../utils/time_converter";
import { UserContext } from "../context/UserProvider";
import { TransactionsContext } from "../context/TransactionsProvider";


const headers = {
    authorization: `Bearer ${localStorage.getItem(StorageKeys.userToken)}`
}


function Dashboard() {      
    const user = useContext(UserContext);
    const txns = useContext(TransactionsContext);
    const navigate = useNavigate();

    async function fetchUserBalance() {
        try {
            const headers = {
                authorization: `Bearer ${localStorage.getItem(StorageKeys.userToken)}`
            }

            const res = await axios.get(
                Endpoints.balance,
                { headers }
            );

            if (user?.email !== res.data.data.user) {
                user?.updateEmail(res.data.data.user);
            }
            user?.updateBalance(res.data.data.balance.amount / 100);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchTransactions() {
        try {
            const res = await axios.get(Endpoints.transactions, { headers });

            txns?.setTxns(res.data.data.transactions);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        fetchUserBalance();

        if(txns?.txns.length === 0) {
            fetchTransactions();
        }
    }, []);

    return (
        <div className="h-screen w-full bg-black/95 flex flex-col items-center">
            <Appbar />

            <div className="w-[60vw] px-6 py-8 bg-black neon-glow-card text-gray-400 flex-col">
                <h1 className="text-3xl font-semibold">Welcome Bob</h1>
                <hr className="text-gray-800 my-2" />

                <div className="my-4 flex items-end justify-between">
                    <div>
                        <p className="mb-4 text-xl font-medium text-gray-500">Your balance: </p>
                        <h2 className="text-5xl text-neon font-bold">${user?.balance}</h2>
                    </div>

                    <div>
                        <Button classes="mb-2" onClick={() => {
                            navigate("/addFunds");
                        }}>Add Money</Button>
                    </div>
                </div>

                <hr className="text-gray-800 my-2 border-b-4 border-b-gray-500" />


                <div className="mt-8 flex flex-col">
                    <h3 className="text-2xl">Transactions</h3>
                    <hr className="text-gray-800 my-2" />
                    {txns?.txns.length === 0 ? <p>No Transactions</p> : <div>
                        <ul>
                            {txns?.txns.map((t: any) => {
                                return <li key={t.id}>
                                    <div className="my-4 flex justify-between items-center">
                                        <div className="flex">
                                            {t.senderId === user?.email ? (
                                                <div className="h-10 w-10 mr-4 flex-center bg-red-700/15 border-2 border-red-700/20 rounded-full">
                                                    <MdCallMade className="text-red-700 text-2xl" />
                                                </div>
                                            ) : (
                                                <div className="h-10 w-10 mr-4 flex-center bg-green-700/15 border-2 border-green-700/20 rounded-full">
                                                    <MdCallReceived className="text-green-700 text-2xl" />
                                                </div>
                                            )}
                                            <div className="flex flex-col">
                                                <p className="text-xl text-gray-200">{t.senderId === user?.email ? t.receiverId : t.senderId}</p>
                                                <p className="text-md text-gray-500">{formatDateTimeLocal(t.createdAt)}</p>
                                            </div>
                                        </div>
                                        {t.senderId === user?.email ? (
                                            <p className="text-3xl text-red-700">- {t.amount / 100}</p>
                                        ) : (
                                            <p className="text-3xl text-green-700">+ {t.amount / 100}</p>
                                        )}

                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>}

                </div>

            </div>


            <div className="fixed bottom-18 z-20">
                <Button
                    onClick={() => navigate("/sendMoney")}>
                    Send Money
                </Button>
            </div>
        </div>
    )
}

export default Dashboard;

