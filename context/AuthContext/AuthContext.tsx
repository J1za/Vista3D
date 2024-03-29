import { createContext, useContext, useEffect, useState } from 'react'
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    sendEmailVerification,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect
} from 'firebase/auth'
import { auth } from '../../config/firebase'
import { pushwriteUserData } from '../../src/services/pushUserDateFirebase'

const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    emailVerify: user.emailVerified,
                    allInfo: user
                })
            } else {
                setUser(null)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])
    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then(registeredUser => {
                pushwriteUserData(registeredUser.user.uid, registeredUser.user.email, registeredUser.user.displayName)
                sendEmailVerification(registeredUser.user)
            })
    }

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const loginWithGoogle = () => {
        return signInWithPopup(auth, provider)
    }
    const upProfile = (fullName: string) => {
        return updateProfile((auth.currentUser as any), {
            displayName: fullName
        })
    }

    const logout = async () => {
        setUser(null)
        await signOut(auth)
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, upProfile, loginWithGoogle }}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}