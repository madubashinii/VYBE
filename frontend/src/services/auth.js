"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const isLoggedIn = () => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token");
};

// check login status
export const useIsLoggedIn = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(isLoggedIn());
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

// Get parsed user from localStorage
export const getUser = () => {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem("user");
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

export const useUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(getUser());
    }, []);

    return user;
};
