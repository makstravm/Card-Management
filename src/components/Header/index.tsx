import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Cookies from "js-cookie";

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

import { RoutesUrls } from "constants/routes";
import { StoreContext } from "store/index";

const { BOARD } = RoutesUrls;

export const Header = observer(() => {
  const { logOut, user } = useContext(StoreContext).auth;

  const onLogOut = () => {
    Cookies.remove("token");
    logOut();
  };

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
          {user?.name && (
            <Grid item>
              <Grid container alignItems="center">
                <Typography variant="h6" pr={1} color="textSecondary">
                  {`Hi, ${user?.name}`}
                </Typography>
                <IconButton onClick={onLogOut}>
                  <LogoutIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
    </AppBar>
  );
});
