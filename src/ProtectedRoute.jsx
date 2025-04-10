/**
 * ProtectedRoute Component
 *
 * Guards access to private routes based on:
 * 1. Authentication (via Firebase token + user profile from backend)
 * 2. User role (admin/player)
 *
 * Props:
 * - children: The component/page to render if allowed
 * - requiredRole: (optional) Role required to access this route ('admin' or 'player')
 *
 * Behavior:
 * - If user is loading: show loading message
 * - If not authenticated: redirect to /login
 * - If role mismatch: redirect to their correct dashboard (/mainplayer or /mainadmin)
 */

import React from "react";
import { Navigate } from "react-router-dom";
import { useGetUserQuery } from "./services/userApi";

export default function ProtectedRoute({ children, requiredRole }) {
    const { data, isLoading, error } = useGetUserQuery();

    // ⏳ Show loading until auth check is done
    if (isLoading) return <div>Loading auth...</div>;

    // 🔐 Redirect to login if not authenticated or token is missing
    if (!data || !localStorage.getItem("token")) {
        return <Navigate to="/login" />;
    }

    // ❌ If role doesn't match requiredRole, redirect to the user's actual dashboard
    if (requiredRole && data.data.role !== requiredRole) {
        if (data.data.role === 'player') {
            return <Navigate to="/mainplayer" />;
        } else if (data.data.role === 'admin') {
            return <Navigate to="/mainadmin" />;
        }
    }

    // ✅ All checks passed, render protected component
    return children;
}
