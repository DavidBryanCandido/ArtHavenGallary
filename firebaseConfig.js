import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import 'base-64'

const firebaseConfig = {
    apiKey: 'AIzaSyB4iCxs3EUSvky6cm-hLM6tKMCAsDtOwCo',
    authDomain: 'arthavengallary.firebaseapp.com',
    projectId: 'arthavengallary',
    storageBucket: 'arthavengallary.appspot.com',
    messagingSenderId: '599105301189',
    appId: '1:599105301189:web:1ccc6dff2456cc36781eac',
}

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP)
