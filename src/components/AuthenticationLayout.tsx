import { Avatar, Box, Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export const AuthenticationLayout = () => (
  <Container component="main" maxWidth="xs">
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Outlet />
    </Box>
  </Container>
);
