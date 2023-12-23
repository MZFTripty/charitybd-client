import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import { auth } from "../Firebase/firbase.config"

export const AuthContext = createContext(null)
 

function AuthProvider({children}) {
    const [loading, setLoading] = useState(true)
    const [user , setUser]= useState(null)
    const provider = new GoogleAuthProvider()

    const createUser =(email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logOut =()=>{
        return signOut(auth)
    }
    const signInUser = (email , password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth , email, password)
    }

    const signInGoogle=()=>{
        return signInWithPopup(auth, provider)
    }

    useEffect(()=>{
        const unSub = onAuthStateChanged(auth, currentUser=>{
            console.log(currentUser)
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{
            return unSub();
        }
    },[])

    const info ={
        loading, createUser,user,setLoading, logOut,signInUser, signInGoogle
    }

  return (
    <AuthContext.Provider value={info}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

