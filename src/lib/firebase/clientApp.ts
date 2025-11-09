"use client";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCY97F1PWgEkVgNn-yJPSea93Ym46qX1p8",
    authDomain: "gen-lang-client-0599013375.firebaseapp.com",
    projectId: "gen-lang-client-0599013375",
    storageBucket: "gen-lang-client-0599013375.firebasestorage.app",
    messagingSenderId: "145593178509",
    appId: "1:145593178509:web:50b83b138f71ddec4785c4"
};

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);