import React from "react";
import { FormikProps, useFormik } from "formik";
import { useDispatch } from "react-redux";

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { NavLink, useNavigate } from "react-router-dom";
import { Btn } from "./Btn/Btn";

import { FormicValuesType, FormPropsType } from "./types";

export const Form = ({
  initialValues,
  formFields,
  title,
  titleLink,
  link,
  buttonText,
  onSubmit,
  validationSchema,
}: FormPropsType) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    errors,
    touched,
    handleChange,
    isValid,
    handleSubmit,
    dirty,
  }: FormikProps<FormicValuesType> = useFormik({
    initialValues,
    onSubmit: (values) => {
      dispatch(onSubmit(values, () => navigate("/")));
    },
    validationSchema,
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 1, px: 2 }}>
        <Typography variant="h4" align="center" sx={{ pb: 2 }}>
          {title}
        </Typography>
        <form>
          <Grid container justifyContent="center" spacing={2}>
            {formFields.map(({ id, name, type, label }) => (
              <Grid key={id} item xs={10}>
                <TextField
                  name={name}
                  label={label}
                  type={type}
                  size="small"
                  autoComplete="given-name"
                  fullWidth
                  error={!!(touched[name] && errors[name])}
                  helperText={touched[name] && errors[name]}
                  onChange={handleChange}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 3, mb: 2 }} textAlign="center">
            <Btn
              handleClick={() => handleSubmit()}
              title={buttonText}
              variantBtn="contained"
              disabled={!isValid && !dirty}
            />{" "}
          </Box>
          <Box textAlign="center">
            <NavLink className="nav-link" to={link}>
              <Button color="primary">{titleLink}</Button>
            </NavLink>
          </Box>
        </form>
      </Box>
    </Container>
  );
};
