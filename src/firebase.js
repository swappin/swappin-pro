import { initializeApp } from 'firebase';
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/firestore'

 const app = initializeApp({
  apiKey: "AIzaSyCZKLmsGnwSrCo6lapbdQpA08LfJeByecY",
  authDomain: "swappin-database.firebaseapp.com",
  databaseURL: "https://swappin-database.firebaseio.com",
  projectId: "swappin-database",
  storageBucket: "swappin-database.appspot.com",
  messagingSenderId: "614181893523",
  appId: "1:614181893523:web:f532d3b2d6173b80312466",
  measurementId: "G-22JBE3SEJR"
  });


export const db = app.firestore();
export const empresaCollection = db.collection('stores');
export const produtosCollection = db.collection('products');








