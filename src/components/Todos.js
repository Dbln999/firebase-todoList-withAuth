import React, { useContext, useState } from "react";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";

const Todos = ({ todo, removeTodo }) => {
  const [disable, setDisable] = useState(true);

  const [todoForm, setTodoForm] = useState(todo.todo);
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);

  const changeHandler = (e) => {
    setTodoForm(e.target.value);
  };

  const updateHandler = async () => {
      setDisable(!disable)
      await firestore.collection(`todo-${user.uid}`).doc(`Todo-${todo.num}`).update({
          todo:todoForm
      });

  }


  return (
    <div className="d-flex justify-content-around align-items-center todo">
      <div className="fs-5" onClick={updateHandler}>
        &#9999;
      </div>
      <input
        className="fs-4 w-50 text-center p-2 border-0 bg-lightGreen todoForm"
        disabled={disable}
        value={todoForm}
        onChange={changeHandler}
      ></input>
      <div className="fs-4" onClick={() => removeTodo(todo.num)}>&#128465;</div>
    </div>
  );
};

export default Todos;
