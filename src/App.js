import "./App.css";
import React, {useContext} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavbarComponent } from "./components/NavbarComponent";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
import {Context} from "./index";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "./components/Loader";

function App() {
    const { auth } = useContext(Context);

    const [user, loading, error] = useAuthState(auth);

    if(loading) {
       return <Loader></Loader>
    }
  return (
    <BrowserRouter>
      <NavbarComponent />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
