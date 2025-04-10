import React from "react";
import { Navigate } from "react-router-dom";
import { useGetUserQuery } from "./services/userApi";

export default function ProtectedRoute({ children, requiredRole }) {
    const { data, isLoading, error } = useGetUserQuery();

    if (isLoading) return <div>Loading auth...</div>;

    if (!data || !localStorage.getItem("token")) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && data.data.role !== requiredRole) {
        if (data.data.role === 'player') {
            return <Navigate to="/mainplayer" />;
        } else if (data.data.role === 'admin') {
            return <Navigate to="/mainadmin" />;
        }
    }

    return children;
}
