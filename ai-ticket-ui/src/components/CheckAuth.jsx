import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CheckAuth = ({ children, protectedRoute = false }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(protectedRoute) {
            if(!token) {
                navigate("/login");
            }
        } else {
            if(token) {
                navigate("/");
            }
        }
        setLoading(false);
    }, [navigate, protectedRoute]);

    if(loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return children;
}

export default CheckAuth