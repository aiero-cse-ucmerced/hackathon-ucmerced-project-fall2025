"use client";
import {
    onIdTokenChanged,
} from "../lib/firebase/auth";
import { setCookie, deleteCookie } from "cookies-next";
import type { User } from "firebase/auth";
import { useEffect } from "react";

export function useUserSession(initialUser: User | null = null) {
    useEffect(() => {
        return onIdTokenChanged(async (user: User | null) => {
            if (user) {
                const idToken = await user.getIdToken();
                setCookie("__session", idToken);
            } else {
                deleteCookie("__session");
            }
            if (initialUser?.uid === user?.uid) {
                return;
            }
        });
    }, [initialUser]);

    return initialUser;
}