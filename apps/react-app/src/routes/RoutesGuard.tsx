import React from "react"
import { isUserAuthenticated } from "../utils/UserAuthCheck"
import { Navigate } from "react-router-dom";

interface ReactChild {
    children: React.ReactNode
}

export const PublicRoute = ({ children }: ReactChild) => {
    const isAuthenticated = isUserAuthenticated();

    return(
        isAuthenticated ? <Navigate to="/dashboard" /> : children
    );
}

export const ProtectedRoute = ({ children }: ReactChild) => {
    const isAuthenticated = isUserAuthenticated();

    return(
        !isAuthenticated ? <Navigate to="/signin" /> : children
    );
}