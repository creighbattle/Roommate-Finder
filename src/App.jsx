import React from "react";

import "./App.css";
import AccountBox from "./components/accountBox";
import HomeScreen from "./components/HomeScreen";
import PhotoScreen from "./components/PhotoScreen";
import firebase from "firebase/app";
import "firebase/auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// const AppContainer = styled.div`
//   width: 100%;
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

const firebaseConfig = {
  apiKey: "AIzaSyA1P4FTIkPoCGyAffT6oW6qp4m2rPbsNJw",
  authDomain: "photo-share-84519.firebaseapp.com",
  projectId: "photo-share-84519",
  storageBucket: "photo-share-84519.appspot.com",
  messagingSenderId: "259198451870",
  appId: "1:259198451870:web:6908b036ef99efbcf9fb8f",
  measurementId: "G-6PGFPP4DFK",
};

firebase.initializeApp(firebaseConfig);

function App() {
  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((userFirebase) => {
  //     if (userFirebase) {

  //       changeWindow();
  //     } else {
  //       console.log("no user signed in");
  //     }
  //   });
  //   console.log("hi");
  // }, [user]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={AccountBox} />
        <Route path="/home" exact component={HomeScreen} />
        <Route path="/photos" exact component={PhotoScreen} />
      </Switch>
    </Router>
  );
}

export default App;
