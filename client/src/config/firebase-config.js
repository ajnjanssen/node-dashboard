import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCeD6z2bcf6gSuP2g8TWCuOPOSXPTLaeLw',
    authDomain: 'node-dashboard-18fbd.firebaseapp.com',
    projectId: 'node-dashboard-18fbd',
    storageBucket: 'node-dashboard-18fbd.appspot.com',
    messagingSenderId: '1053613926051',
    appId: '1:1053613926051:web:36c985848fa1bc20954116',
    measurementId: 'G-M0JYFES5V3',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
// firebase.analytics()
export const auth = firebase.auth()

export default firebase
