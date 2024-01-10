import React, {useState} from 'react'
import {auth, googleProvider} from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'


const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    console.log(auth?.currentUser?.email);
    const signIn = async () => { 
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {   
            console.error(err);
        } 
    }
    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
            
    }
    const logout = async () => {
        try{
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    }
  return (
    <div>
        <h1>Sign In</h1>
        <input 
            type="text" 
            placeholder="Username" 
            onChange={(e) => setEmail(e.target.value)}
        />
        <input 
            type="password" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}>Sign In</button>
        <button onClick={signInWithGoogle}>Sign IN</button>
        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Auth