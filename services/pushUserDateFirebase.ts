import { database } from "../config/firebase";
import { ref, set } from "firebase/database";

interface WriteUserDataProp {
    userId: string
    name?: string
    email?: string
}

export function pushwriteUserData(userId?: string, email?: string | null, name?: string | null,) {
    set(ref(database, 'users/' + userId), {
        email,
        name,
    });
}