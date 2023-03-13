import {getApp, getApps, initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBaMArkpBNh4Tb-knf2Rhho-9GjwzJp0VA",
    authDomain: "restaurant-app-f70e7.firebaseapp.com",
    databaseURL: "https://restaurant-app-f70e7-default-rtdb.firebaseio.com",
    projectId: "restaurant-app-f70e7",
    storageBucket: "restaurant-app-f70e7.appspot.com",
    messagingSenderId: "595679339723",
    appId: "1:595679339723:web:55d153ed14627ebc3d674e"
  };

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
export {app, firestore, storage};