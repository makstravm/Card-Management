import React from "react";
import { NavLink } from "react-router-dom";

import { AppBar, Button, Container, Toolbar } from "@mui/material";

import { HeaderPropsType } from "./types";

export const Header = ({ linksNavBar }: HeaderPropsType) => (
  <AppBar className="Header" color="transparent" position="relative">
    <Container>
      <Toolbar>
        {linksNavBar.map(({ id, title, link }) => (
          <NavLink className="nav-link" key={id} to={link}>
            <Button color="primary">{title}</Button>
          </NavLink>
        ))}
      </Toolbar>
    </Container>
  </AppBar>
);
