import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCl7_24hMUWlPo8dCGLxBhQfg53IrQKwbU",
  authDomain: "vrscoreboard.firebaseapp.com",
  projectId: "vrscoreboard",
  storageBucket: "vrscoreboard.appspot.com",
  messagingSenderId: "195847156423",
  appId: "1:195847156423:web:fbc2136c472b9a1dd544e2"
};
if(!firebase.apps.length)
firebase.initializeApp(firebaseConfig);

export default firebase.firestore()