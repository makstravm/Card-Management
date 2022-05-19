import React, { useContext } from "react";
import { Form, Formik, FormikProps } from "formik";
import { observer } from "mobx-react-lite";

import { Box, Divider, TextField, Typography } from "@mui/material";
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
    const { editFieldAction, saveFieldAction } =
      useContext(StoreContext).fields;

    const onSaveField = ({ name, required, options }: FormikStateType) => {
      if (field?.id) {
        editFieldAction(field.name, {
          ...field,
          name,
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
          const { errors, touched, handleChange, isValid } = formik;

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
                      <Box
                        pt={1}
                        sx={{ maxHeight: "360px", overflowY: "auto" }}
                      >
                        <SelectOptions options="options" formik={formik} />
                      </Box>
                    </>
                  )}
                </Box>
              )}
              <Box display="flex" justifyContent="center" pt={1} pb={1}>
                <Btn
                  title="Save"
                  variantBtn="outlined"
                  handleClick={() => formik.handleSubmit()}
                  disabled={!isValid}
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
