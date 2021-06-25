import firebase from 'firebase/app'
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';
import firebaseConfig from './firebase-config';

const firebaseApp = firebase.initializeApp(firebaseConfig);

firebaseApp.firestore();

export default {
    
    googleLogin: async() => {
        const provider = new firebase.auth.GoogleAuthProvider();
        let result = await firebase.auth().signInWithPopup(provider);
        return result;
    }
}