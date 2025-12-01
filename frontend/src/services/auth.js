"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// check login status
export const useIsLoggedIn = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoggedIn(!!token);
    }, []);

    return loggedIn;
};

// hook for logout
export const useLogout = () => {
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
    };

    return logout;
};
