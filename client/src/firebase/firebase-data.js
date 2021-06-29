import firebase from 'firebase/app'
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDRsBdriauu6yvfvlIze1Moy62TmmHlYNo",
    authDomain: "jmgames-189ce.firebaseapp.com",
    projectId: "jmgames-189ce",
    storageBucket: "jmgames-189ce.appspot.com",
    messagingSenderId: "615226212299",
    appId: "1:615226212299:web:21a7a6d76ccb45b6a1c04e"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

firebaseApp.firestore();

const firebaseData = {
    googleLogin: async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        let result = await firebase.auth().signInWithPopup(provider);
        return result;
    }
}

export { firebaseData, firebaseApp };
