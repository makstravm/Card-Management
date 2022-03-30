import React from "react";
import { FormikProps, useFormik } from "formik";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  FormFieldType,
  RegistrationInitialValueType,
} from "../../constants/RegistrationFormsFields";
import { LoginInitialValueType } from "../../constants/LoginFormsFields";
import { useDispatch } from "react-redux";
export type FormicValues = {
  [index: string]: string;
};
type initialValuesType = RegistrationInitialValueType | LoginInitialValueType;
type FormPropsType = {
  initialValues: initialValuesType;
  formFields: FormFieldType[];
  title: string;
  buttonText: string;
  onSubmit: (values: any) => void;
  validationSchema: any;
};
export const Form = ({
  initialValues,
  formFields,
  title,
  buttonText,
  onSubmit,
  validationSchema,
}: FormPropsType) => {
  const dispatch = useDispatch();

  const {
    values,
    errors,
    touched,
    handleChange,
    isValid,
    handleSubmit,
    dirty,
  }: FormikProps<FormicValues> = useFormik({
    initialValues,
    onSubmit: (values: any) => dispatch(onSubmit(values)),
    validationSchema,
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 3, px: 2 }}>
        <Typography variant="h4" align="center" sx={{ pb: 2 }}>
          {title}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container justifyContent="center" spacing={2}>
            {formFields.map(({ id, name, type, label }) => (
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
              {buttonText}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};
