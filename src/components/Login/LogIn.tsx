import React from "react";
import { FormikProps, useFormik } from "formik";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import loginSchema from "../constants/LoginSchema";
import { FormicValues } from "../Registration/Registration";
import loginFormFields from "../constants/LoginFormsFields";

export const Login = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    isValid,
    handleSubmit,
    dirty,
  }: FormikProps<FormicValues> = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => console.log(values),
    validationSchema: loginSchema,
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 3, px: 2 }}>
        <Typography variant="h4" align="center" sx={{ pb: 2 }}>
          Log In
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container justifyContent="center" spacing={2}>
            {loginFormFields.map(({ id, name, type, label }) => (
              <Grid key={id} item xs={10}>
                <TextField
                  name={name}
                  label={label}
                  value={values[name]}
                  type={type}
                  autoComplete="given-name"
                  fullWidth
                  error={touched[name] && errors[name] ? true : false}
                  helperText={touched[name] && errors[name]}
                  onChange={handleChange}
                />
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center">
            <Button
              type={"submit"}
              disabled={!isValid && !dirty}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};
