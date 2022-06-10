import React, { useEffect, useState } from "react";
import { Formik, FormikProps } from "formik";

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
  const navigate = useNavigate();

  const [propsFormik, setPropsFormik] = useState<
    Pick<FormPropsType, "initialValues" | "validationSchema">
  >({
    initialValues,
    validationSchema,
  });

  useEffect(() => {
    setPropsFormik({
      initialValues,
      validationSchema,
    });
  }, [validationSchema]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 1, px: 2 }}>
        <Typography variant="h4" align="center" sx={{ pb: 2 }}>
          {title}
        </Typography>
        {propsFormik.initialValues &&
          Object.keys(propsFormik.initialValues).length ===
            Object.keys(initialValues).length && (
            <Formik
              {...propsFormik}
              onSubmit={(values) => onSubmit(values, navigate)}
            >
              {({
                errors,
                touched,
                handleChange,
                isValid,
                handleSubmit,
                dirty,
              }: FormikProps<FormicValuesType>) => (
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
              )}
            </Formik>
          )}
      </Box>
    </Container>
  );
};
