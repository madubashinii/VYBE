"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "../services/auth";

export default function ProtectedRoute({ children }) {
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn()) router.push("/auth/login");
    }, []);

    return isLoggedIn() ? children : null;
}
