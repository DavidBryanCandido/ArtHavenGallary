import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

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

// import auth from '@react-native-firebase/auth'
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase

// const app = initializeApp(firebaseConfig)

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// import firebase from 'firebase/app'
// import 'firebase/auth'
// import 'firebase/database'

// const firebaseConfig = {
//     apiKey: 'AIzaSyB4iCxs3EUSvky6cm-hLM6tKMCAsDtOwCo',
//     authDomain: 'arthavengallary.firebaseapp.com',
//     projectId: 'arthavengallary',
//     storageBucket: 'arthavengallary.appspot.com',
//     messagingSenderId: '599105301189',
//     appId: '1:599105301189:web:1ccc6dff2456cc36781eac',
// }

// firebase.initializeApp(firebaseConfig)

// export default firebase

// // // import { initializeApp } from 'firebase/app'

// // // Optionally import the services that you want to use
// // // import {...} from "firebase/auth";
// // // import {...} from "firebase/database";
// // // import {...} from "firebase/firestore";
// // // import {...} from "firebase/functions";
// // // import {...} from "firebase/storage";

// // // Initialize Firebase
// // export const firebaseConfig = {
// //     apiKey: 'AIzaSyB4iCxs3EUSvky6cm-hLM6tKMCAsDtOwCo',
// //     authDomain: 'arthavengallary.firebaseapp.com',
// //     projectId: 'arthavengallary',
// //     storageBucket: 'arthavengallary.appspot.com',
// //     messagingSenderId: '599105301189',
// //     appId: '1:599105301189:web:1ccc6dff2456cc36781eac',
// // }

// // // const app = initializeApp(firebaseConfig)
// // // For more information on how to access Firebase in your project,
// // // see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
