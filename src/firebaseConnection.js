import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCFU8L2g0MhzNrBHv4qp7vIVX3wILy3Ud0",
  authDomain: "crudreact-611eb.firebaseapp.com",
  projectId: "crudreact-611eb",
  storageBucket: "crudreact-611eb.appspot.com",
  messagingSenderId: "724881620862",
  appId: "1:724881620862:web:5bf0db2ef3a902813fbd2f",
  measurementId: "G-VM0VQL2HYZ"
};

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);

  export { db };