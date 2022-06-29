import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Auth";
import TodoPage from "./TodoPage";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";

const AppRoutes = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return !user ? (
    <Routes>
      <Route path="/register" element={<Auth />} exact></Route>
      <Route
        path="*"
        element={<Navigate replace to={"/register"}></Navigate>}
      ></Route>
    </Routes>
  ) : (
    <Routes>
      <Route path="/todos" element={<TodoPage />} exact></Route>
      <Route
        path="*"
        element={<Navigate replace to={"/todos"}></Navigate>}
      ></Route>
    </Routes>
  );
};

export default AppRoutes;
