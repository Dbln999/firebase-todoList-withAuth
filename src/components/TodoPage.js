import React, { useContext, useState } from "react";
import { Container, Button, Row, Form, Col } from "react-bootstrap";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "./Loader";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";
import { hydrateRoot } from "react-dom/client";
import Todos from "./Todos";

const TodoPage = () => {
  const [todoValue, setTodoValue] = useState("");
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [todos, loading] = useCollectionData(
    firestore.collection(`todo-${user.uid}`).orderBy("createdAt")
  );
  const [number, setNumber] = useState(0);

  const addTodo = async () => {
    firestore.collection(`todo-${user.uid}`).doc(`Todo-${number}`).set({
      uid: user.uid,
      todo: todoValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      num: number,
    });
    setNumber(number + 1);
    setTodoValue("");
  };

  if (loading) {
    return <Loader />;
  }

  const removeTodo = async (num) => {
    await firestore.collection(`todo-${user.uid}`).doc(`Todo-${num}`).delete();
  };

  const numberHandler = () => {
    if (todos.length === 0) {
      setNumber(0);
    } else {
      setNumber(number + todos.length);
    }
  };

  return (
    <Container className="my-5 w-50 bg-lightGreen todoContainer">
      <Row>
        <Col md="12" className="d-flex justify-content-center mx-1 my-4">
          <Form.Control
            size="lg"
            type="text"
            placeholder="Enter your todo here"
            className="w-75 "
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
            onClick={numberHandler}
          />
          <Button className="fs-5" onClick={addTodo}>
            Add Todo
          </Button>
        </Col>
        <Col md="12">
          {todos.map((todo) => {
            return <Todos key={todo.num} removeTodo={removeTodo} todo={todo} />;
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default TodoPage;
