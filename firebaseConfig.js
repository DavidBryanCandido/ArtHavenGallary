import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";;



const firebaseConfig = {
    apiKey: 'AIzaSyB4iCxs3EUSvky6cm-hLM6tKMCAsDtOwCo',
    authDomain: 'arthavengallary.firebaseapp.com',
    projectId: 'arthavengallary',
    storageBucket: 'arthavengallary.appspot.com',
    messagingSenderId: '599105301189',
    appId: '1:599105301189:web:1ccc6dff2456cc36781eac',
}

let app;

if (firebase.app.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth }
