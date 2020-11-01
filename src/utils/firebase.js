import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCOjcZjPc3HkgA3xf7F3mZGcoLeAdztWxw',
  authDomain: 'praticeonexx.firebaseapp.com',
  databaseURL: 'https://praticeonexx.firebaseio.com',
  projectId: 'praticeonexx',
  storageBucket: 'praticeonexx.appspot.com',
  messagingSenderId: '490597032836',
  appId: '1:490597032836:web:b862c3b2c1bbeb3a83b3d1',
  measurementId: 'G-ERQP8F8DD0',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth();

export const db = firebase.firestore();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp();
export const carsCollection = db.collection('cars');

export const usersCollection = db.collection('users');

export default firebase;
