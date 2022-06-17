import React, { useState, createContext, useEffect } from 'react'
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export function AuthProvider({children}){
 const[user, setUser] = useState(null);
 const[loadingAuth, setLoadingAuth] = useState(false);
 const[loadingRender, setLoadingRender] = useState(true);

  useEffect(()=>{
    async function loadStorage(){
      const storageUser = await AsyncStorage.getItem('@devapp');
      const jsonValue = JSON.parse(storageUser);
      
      if(storageUser !== null){
        setUser(jsonValue);
        setLoadingRender(false);
      }

      setLoadingRender(false);
    }

    loadStorage();
  }, [])


 async function signUp(email, password, name){
  setLoadingAuth(true);
  
  await firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(async(value)=>{
    let uid = value.user.uid;
    await firebase.firestore().collection('users')
    .doc(uid).set({
      name: name,
      createAt: new Date(), 
    })
    .then(()=>{
      let data = {
        uid: uid,
        name: name,
        email: value.user.email
      };

      setUser(data);
      storageUser(data);
      setLoadingAuth(false);
    })

  })
  .catch((error)=>{
    let errorCode = error.code;

    if(errorCode == 'auth/email-already-in-use'){
      alert('An account with this email already exists, please try again.');
      setLoadingAuth(false);
      return;
    }
    if(errorCode == 'auth/invalid-email'){
      alert('Invalid email address, please try again.');
      setLoadingAuth(false);
      return;
    }
    if(errorCode == 'auth/weak-password'){
      alert('Password is not strong enough, please try again.');
      setLoadingAuth(false);
      return;
    }

    console.log(error);
    setLoadingAuth(false);
  })
 }


  async function signIn(email, password){
    setLoadingAuth(true);

    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async(value)=>{
      let uid = value.user.uid;

      const userProfile = await firebase.firestore().collection('users')
      .doc(uid).get();

      let data = {
        uid: uid,
        name: userProfile.data().name,
        email: value.user.email
      };

      setUser(data);
      storageUser(data);
      setLoadingAuth(false);

    })
    
    .catch((error)=>{
      let errorCode = error.code;

      if(errorCode == 'auth/invalid-email'){
        alert('E-mail inválido, tente novamente.');
        setLoadingAuth(false);
        return;
      }
      if(errorCode == 'auth/wrong-password'){
        alert('Invalid password, please try again.');
        setLoadingAuth(false);
        return;
      }

      console.log(error);
      setLoadingAuth(false);
    })
  }

  async function signOut(){
    await firebase.auth().signOut();
    await AsyncStorage.clear()
    .then(()=>{
      setUser(null);
    })
  }

  async function storageUser(data){
    const jsonValue = JSON.stringify(data);

    await AsyncStorage.setItem('@devapp', jsonValue)
  }


  return(
    <AuthContext.Provider value={{signed: !!user, signUp, signIn, signOut, loadingAuth, loadingRender, user, setUser, storageUser }}>
      {children}
    </AuthContext.Provider>
  );
}

