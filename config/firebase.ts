import { initializeApp, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database'

// Initialize Firebase
function initializeAppIfNecessary() {
    try {
        return getApp();
    } catch (any) {
        const firebaseConfig = {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
            databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
            projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
            messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_APPID,
            measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
        };
        return initializeApp(firebaseConfig);
    }
}
const app = initializeAppIfNecessary();
const auth = getAuth()
const database = getDatabase(app)

export { auth, database }