import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDLv2w5DhwvHfN6NDAmd0u_xJyXSHp0v2U",
  authDomain: "greendly.firebaseapp.com",
  projectId: "greendly",
  storageBucket: "greendly.appspot.com",
  messagingSenderId: "749114756416",
  appId: "1:749114756416:web:22ef4316220127ef317ea5",
  measurementId: "G-8F9P3GEKDQ"
};

const appfirebase = initializeApp(firebaseConfig);

export const auth = initializeAuth(appfirebase, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default appfirebase;