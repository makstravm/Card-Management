import React from "react";
import { useDispatch } from "react-redux";
import { Form, Formik, FormikProps } from "formik";

import { Box, Divider, TextField, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import { CheckBox } from "components/common/CheckBox/CheckBox";
import { switchedFieldCreateValidation } from "helpers/optionsValidSchema/optionsValidSchema";
import { editFieldAction, saveFieldAction } from "store/fields/actions";
import { TypesFields } from "constants/typesFields";
import { Btn } from "components/common/Btn/Btn";
import { SelectOptions } from "../SelectOptions/SelectOptions";

import { FieldCreatorPropsType, FormikStateType } from "./types";

const { TEXT, SELECT } = TypesFields;

export const FieldCreator = ({ type, field }: FieldCreatorPropsType) => {
  const dispatch = useDispatch();

  const onSaveField = ({ name, required, options }: FormikStateType) => {
    if (field?.id) {
      dispatch(
        editFieldAction(field.name, {
          ...field,
          name,
          type,
          required: (type === TEXT && required) || false,
          options: (type !== SELECT && []) || options,
        })
      );
    } else {
      dispatch(
        saveFieldAction({
          name,
          type,
          required: (type === TEXT && required) || false,
          options: (type !== SELECT && []) || options,
        })
      );
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
                <Box pb={2}>
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
                    <CheckBox
                      name="required"
                      checked={formik?.values?.required}
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
            )}
            <Box display="flex" justifyContent="center" pb={1}>
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
};
