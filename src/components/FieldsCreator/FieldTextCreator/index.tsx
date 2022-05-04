import React, { useContext, useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import { observer } from "mobx-react-lite";

import { Alert, Box, Divider, TextField, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import { CheckBox } from "components/common/CheckBox/CheckBox";
import { Btn } from "components/common/Btn/Btn";

import { TypesFields } from "constants/typesFields";

import { switchedFieldCreateValidation } from "helpers/optionsValidSchema";

import { StoreContext } from "store/index";
import { SelectOptions } from "../SelectOptions";

import { FieldCreatorPropsType, FormikStateType } from "./types";

const { TEXT, SELECT } = TypesFields;

export const FieldCreator = observer(
  ({ type, field }: FieldCreatorPropsType) => {
    const { fieldsList, editFieldAction, saveFieldAction } =
      useContext(StoreContext).fields;

    const [errorName, setErrorName] = useState(false);

    const onSaveField = ({ name, required, options }: FormikStateType) => {
      const checkName = fieldsList?.find(
        ({ name: fieldName }) => fieldName === name
      );

      if (checkName) {
        setErrorName(true);
      }
      if (field?.id) {
        editFieldAction(field.name, {
          ...field,
          name,
          type,
          required: (type === TEXT && required) || false,
          options: (type !== SELECT && []) || options,
        });
      } else {
        saveFieldAction({
          name,
          type,
          required: (type === TEXT && required) || false,
          options: (type !== SELECT && []) || options,
        });
      }
    };

    return (
      <Formik
        initialValues={field}
        onSubmit={async (values) => onSaveField(values)}
        validationSchema={switchedFieldCreateValidation(type)}
      >
        {(formik: FormikProps<FormikStateType>) => {
          const { errors, touched, handleChange, isValid, dirty } = formik;

          return (
            <Form>
              {type && (
                <Box pt={2}>
                  <Box pb={2} display="flex">
                    <TextField
                      label="Name Field"
                      name="name"
                      value={formik.values.name}
                      onChange={handleChange}
                      size="small"
                      error={!!(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                    {type === TEXT && (
                      <Box pl={1}>
                        <CheckBox
                          name="required"
                          checked={formik?.values?.required}
                          handleChange={handleChange}
                        />
                      </Box>
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
              )}
              {errorName && (
                <Alert variant="outlined" severity="error">
                  A field with this name exists!!!
                </Alert>
              )}
              <Box display="flex" justifyContent="center" pt={1} pb={1}>
                <Btn
                  title="Save"
                  variantBtn="outlined"
                  handleClick={() => formik.handleSubmit()}
                  disabled={!isValid && !dirty}
                  icon={<SaveIcon fontSize="small" />}
                />
              </Box>
            </Form>
          );
        }}
      </Formik>
    );
  }
);
