import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
    const { isAuthenticated, loading, isAdmin, user } = useSelector((state) => state.user);

    if (loading) {
        return <h2>Loading...</h2>; // Return JSX element for loading state
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (isAdmin && user?.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />; // Render child routes if authenticated
}

export default PrivateRoute;
