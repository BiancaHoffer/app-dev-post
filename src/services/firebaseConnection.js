import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

let firebaseConfig = {
  apiKey: "AIzaSyDupT2SkisFflQJFsB5425YqRomPYo485Q",
  authDomain: "appdevpost-cd591.firebaseapp.com",
  projectId: "appdevpost-cd591",
  storageBucket: "appdevpost-cd591.appspot.com",
  messagingSenderId: "953470083849",
  appId: "1:953470083849:web:6d0ccf98ec2451b39c29d8"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)  
}

export default firebase;