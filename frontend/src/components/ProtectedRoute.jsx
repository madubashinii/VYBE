"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn, useIsLoggedIn, getUser } from "../services/auth";

export default function ProtectedRoute({ children, role }) {
    const router = useRouter();
    const loggedIn = useIsLoggedIn();

    useEffect(() => {
        if (!isLoggedIn()) {
            router.push("/login");
            return;
        }

        if (role) {
            const user = getUser();
            if (!user || (user.role ?? "user") !== role) {
                router.push("/");
            }
        }
    }, [router, role]);

    if (!loggedIn) return null;

    return children;
}
