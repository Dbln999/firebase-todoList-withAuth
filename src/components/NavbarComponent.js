import React, { useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";

export const NavbarComponent = () => {
  const { auth } = useContext(Context);

  const logout = () => {
      auth.signOut()
  }

  const [user] = useAuthState(auth);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#">TodoList</Navbar.Brand>
        <Nav className="">
          {user ? (
            <Button size="sm" variant="outline-light" onClick={logout}>
              Log out
            </Button>
          ) : (
            <Button size="sm" variant="outline-light">
              Sign in
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
