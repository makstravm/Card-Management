import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Button, Container, Toolbar } from "@mui/material";

export const Header = () => (
  <AppBar color="transparent" position="relative">
    <Container>
      <Toolbar>
        <Link className="nav-link" to="/login">
          <Button color="primary">LogIn</Button>
        </Link>
        <Link className="nav-link" to="/">
          <Button color="primary">Registration</Button>
        </Link>
        <Link className="nav-link" to="/board">
          <Button color="primary">Board</Button>
        </Link>
      </Toolbar>
    </Container>
  </AppBar>
);
