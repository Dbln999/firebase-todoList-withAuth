import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBs5ceAIosep3Bbfbe-B7KZwk6HcmUE61Q",
  authDomain: "todoprojectdbln9.firebaseapp.com",
  projectId: "todoprojectdbln9",
  storageBucket: "todoprojectdbln9.appspot.com",
  messagingSenderId: "19919599835",
  appId: "1:19919599835:web:94bfa398a3096243cc74fe",
  measurementId: "G-0GGXFV10JT",
});

export const Context = createContext(null);
const auth = firebase.auth();
const firestore = firebase.firestore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider value={{ firebase, auth, firestore }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
