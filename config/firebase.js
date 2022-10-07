import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMAYu7TL1GHF1A801gqd_VbZO3_6ekFcs",
    authDomain: "vista-3d-93953.firebaseapp.com",
    projectId: "vista-3d-93953",
    storageBucket: "vista-3d-93953.appspot.com",
    messagingSenderId: "1062481903624",
    appId: "1:1062481903624:web:ad3ff237a4348fb4e851bd",
    measurementId: "G-987RXQXLTD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);