import React from "react";
import { useDispatch } from "react-redux";
import { Form, Formik, FormikProps } from "formik";
import { v1 } from "uuid";

import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import { CheckBox } from "components/common/CheckBox/CheckBox";
import { switchedFieldCreateValidation } from "helpers/optionsValidSchema/optionsValidSchema";
import { saveFieldAction } from "store/fields/actions";
import { TypesFields } from "constants/typesFields";
import { SelectOptions } from "../SelectOptions/SelectOptions";

import { FieldCreatorPropsType, FormikStateType } from "./types";

const { TEXT, SELECT } = TypesFields;

export const FieldCreator = ({ type }: FieldCreatorPropsType) => {
  const dispatch = useDispatch();

  const onSaveField = ({ name, required, options }: FormikStateType) =>
    dispatch(
      saveFieldAction({
        name,
        type,
        required,
        options: (type !== "select" && []) || options,
      })
    );

  return (
    <Formik
      initialValues={{
        name: "",
        required: false,
        options: [
          { id: v1(), value: "" },
          { id: v1(), value: "" },
        ],
      }}
      onSubmit={async (values) => onSaveField(values)}
      validationSchema={switchedFieldCreateValidation(type)}
    >
      {(formik: FormikProps<FormikStateType>) => {
        const { errors, touched, handleChange, isValid, dirty } = formik;

        return (
          <Form>
            <Box pt={2}>
              <Box pb={2}>
                <TextField
                  label="Name Field"
                  name="name"
                  onChange={handleChange}
                  size="small"
                  error={!!(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                {type === TEXT && (
                  <CheckBox
                    name="required"
                    handleChange={handleChange}
                  />
                )}
              </Box>
              {type === SELECT && (
                <>
                  <Divider textAlign="left" sx={{ paddingBottom: "15px" }}>
                    <Typography variant="subtitle2">Options</Typography>
                  </Divider>
                  <SelectOptions options="options" formik={formik} />
                </>
              )}
            </Box>
            <Box display="flex" justifyContent="center" pb={1}>
              <Button
                variant="outlined"
                type="submit"
                disabled={!isValid && !dirty}
              >
                <SaveIcon fontSize="small" />
                Save
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};
