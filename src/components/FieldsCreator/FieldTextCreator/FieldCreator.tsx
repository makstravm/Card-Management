import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Formik, FormikProps } from "formik";
import { v1 } from "uuid";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import { switchedFieldCreateValidation } from "helpers/optionsValidSchema/optionsValidSchema";
import { saveFieldAction } from "store/fields/actions";
import { SelectOptions } from "../SelectOptions/SelectOptions";

import { FieldCreatorPropsType, FormikStateType } from "./types";

export const FieldCreator = ({ type }: FieldCreatorPropsType) => {
  const dispatch = useDispatch();

  const [requiredCheck, setRequiredCheck] = useState<boolean>(false);

  useEffect(() => {
    setRequiredCheck(false);
  }, [type]);

  const changeChekedRequired = (e: ChangeEvent<HTMLInputElement>) =>
    setRequiredCheck(e.currentTarget.checked);

  const onSaveField = ({ name, options }: FormikStateType) =>
    dispatch(
      saveFieldAction({
        name,
        type,
        required: requiredCheck,
        options: (type !== "select" && []) || options,
      })
    );

  return (
    <Formik
      initialValues={{
        name: "",
        options: [
          { id: v1(), value: "" },
          { id: v1(), value: "" },
        ],
      }}
      onSubmit={async (values) => onSaveField(values)}
      validationSchema={switchedFieldCreateValidation(type)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        isValid,
        dirty,
      }: FormikProps<FormikStateType>) => (
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
              {type === "text" && (
                <FormControlLabel
                  labelPlacement="start"
                  sx={{ paddingLeft: "10px" }}
                  label="Required"
                  control={
                    <Checkbox
                      checked={requiredCheck}
                      onChange={changeChekedRequired}
                    />
                  }
                />
              )}
            </Box>
            {type === "select" && (
              <>
                <Divider textAlign="left" sx={{ paddingBottom: "15px" }}>
                  <Typography variant="subtitle2">Options</Typography>
                </Divider>
                <SelectOptions
                  options="options"
                  values={values}
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                />
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
      )}
    </Formik>
  );
};
