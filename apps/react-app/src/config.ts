const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3003";

export const Endpoints = {
    signup: `${BASE_URL}/api/v1/auth/signup`,
    signin: `${BASE_URL}/api/v1/auth/signin`,
    transfer: `${BASE_URL}/api/v1/transactions/transfer`,
    transactions: `${BASE_URL}/api/v1/transactions/allTxns`,
    balance: `${BASE_URL}/api/v1/balance/checkBalance`,
    addFund: `${BASE_URL}/api/v1/onRampTxn/addFund`
};

export const StorageKeys = {
    userToken: `token`
};