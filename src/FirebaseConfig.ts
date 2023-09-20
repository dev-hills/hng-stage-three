import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCcgZ8FkmO37Yld_vgG5dFCczkm1RNpMUI",
  authDomain: "image-drop-b13bb.firebaseapp.com",
  projectId: "image-drop-b13bb",
  storageBucket: "image-drop-b13bb.appspot.com",
  messagingSenderId: "1004683335562",
  appId: "1:1004683335562:web:8418b4936a30a38681da73",
};

const fireBase = initializeApp(firebaseConfig);
export default fireBase;
