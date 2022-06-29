import React, { useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "./Loader";

const Auth = () => {
  const { auth } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signUp = async (e) => {
    e.preventDefault();
    await auth
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((user) => {
        console.log("WORKS");
      })
      .catch((e) => console.error(e));
  };

  const logIn = async (e) => {
    e.preventDefault();
    await auth.signInWithEmailAndPassword(form.email, form.password);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Container
        className="w-50 bg-lightGreen mt-5 p-3"
        style={{ paddingBottom: "1rem" }}
      >
        <Form>
          <Form.Group className="mb-3" controlId="mail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="pass">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={changeHandler}
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" onClick={signUp}>
              Sign up
            </Button>
            <Button
              variant="primary"
              className="mx-3"
              type="submit"
              onClick={logIn}
            >
              Log in
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Auth;
