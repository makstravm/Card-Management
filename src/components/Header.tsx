import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Button, Container, Toolbar } from "@mui/material";

export const Header = () => (
  <AppBar className="Header" color="transparent" position="relative">
    <Container>
      <Toolbar>
        <NavLink className="nav-link" to="/login">
          <Button color="primary">LogIn</Button>
        </NavLink>
        <NavLink className="nav-link" to="/registration">
          <Button color="primary">Registration</Button>
        </NavLink>
        <NavLink className="nav-link" to="/board">
          <Button color="primary">Board</Button>
        </NavLink>
      </Toolbar>
    </Container>
  </AppBar>
);
