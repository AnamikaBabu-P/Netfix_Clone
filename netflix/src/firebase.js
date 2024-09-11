
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {createUserWithEmailAndPassword,
     getAuth ,
     signInWithEmailAndPassword,
    signOut} from 'firebase/auth'
import {addDoc,
    collection,
     getFirestore} from 'firebase/firestore'
import { toast} from 'react-toastify'     

const firebaseConfig = {
  apiKey: "AIzaSyBP40639kLvEI6f1qh0UKnYrnqyHcjQWtQ",
  authDomain: "netflix-clone-f6ae2.firebaseapp.com",
  projectId: "netflix-clone-f6ae2",
  storageBucket: "netflix-clone-f6ae2.appspot.com",
  messagingSenderId: "827823389345",
  appId: "1:827823389345:web:15850c1803edf62db54ee0",
  measurementId: "G-WN4LJ2WXN2"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email , password)=>{
    try {
      const res =  await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, 'user'),{
        uid: user.uid,
        name,
        authProvider: 'local',
        email,
      })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async(email, password)=>{
    try {
       await signInWithEmailAndPassword(auth, email , password);
    } catch (error) {
       console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(' '))
        
    }
}

const logout = async()=>{
    signOut(auth);
}

export {
    auth,
    db,
    login,
    signup,
    logout
}