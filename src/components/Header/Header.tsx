import React from "react";
import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";

import {
  AppBar,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";

import { selectUserState } from "store/auth/selectors";

import { HeaderPropsType } from "./types";

export const Header = ({ linksNavBar }: HeaderPropsType) => {
  const userName = useSelector(selectUserState);

  return (
    <AppBar className="Header" color="transparent" position="relative">
      <Container>
        <Grid container justifyContent="space-between" alignItems="center" item>
          <Grid item>
            <Toolbar>
              {linksNavBar.map(({ id, title, link }) => (
                <NavLink className="nav-link" key={id} to={link}>
                  <Button color="primary">{title}</Button>
                </NavLink>
              ))}
            </Toolbar>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="textSecondary">
              {userName && `Hi, ${userName}`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};
