"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn, useIsLoggedIn } from "../services/auth";

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const loggedIn = useIsLoggedIn();

    useEffect(() => {
        if (!isLoggedIn()) router.push("/login");
    }, [router]);

    if (!loggedIn) return null;

    return children;
}
