import React from "react";
import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";

import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { selectUserState } from "store/auth/selectors";
import { RoutesUrls } from "constants/routes";

const { BOARD } = RoutesUrls;

export const Header = () => {
  const userName = useSelector(selectUserState);

  return (
    <AppBar className="Header" color="transparent" position="relative">
      <Container>
        <Grid container justifyContent="space-between" alignItems="center" item>
          <Grid item>
            <Toolbar>
              <NavLink className="nav-link" to={BOARD}>
                <Button color="primary">Board</Button>
              </NavLink>
            </Toolbar>
          </Grid>
          {userName && (
            <Grid item>
              <Grid container alignItems="center">
                <Typography variant="h6" pr={1} color="textSecondary">
                  {`Hi, ${userName}`}
                </Typography>
                <IconButton>
                  <LogoutIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
    </AppBar>
  );
};
