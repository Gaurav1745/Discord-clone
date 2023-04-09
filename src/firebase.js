import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCpJIjlB1HN89hRVm5pbXNkkoaPhFMiI1s",
    authDomain: "discord-clone-3d660.firebaseapp.com",
    projectId: "discord-clone-3d660",
    storageBucket: "discord-clone-3d660.appspot.com",
    messagingSenderId: "814189148039",
    appId: "1:814189148039:web:6c25810bae37629c690522",
    measurementId: "G-1D7HXLB51Z"
  };

  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth = firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();
  const messaging =firebase.messaging();

  export { auth , provider , messaging};
  export default db;