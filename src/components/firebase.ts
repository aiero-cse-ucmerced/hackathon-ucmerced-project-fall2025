import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from "../lib/firebase/clientApp";
import { useRouter } from "next/navigation";

export function useUser() {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        return onAuthStateChanged(auth, (authUser) => {
            if (authUser) setUser(authUser!);
        });
    }, []);

    return user;
}