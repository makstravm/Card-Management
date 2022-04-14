import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import { getAllFieldAction } from "store/fields/actions";
import { selectFieldsList } from "store/fields/selectors";

import { Form, Formik } from "formik";
import { CardType } from "store/cards/types";
import { FieldStateType } from "store/fields/types";
import { validateSchemaCard } from "helpers/createCardValidSchema/createCardValidSchema";
import { saveCardAction } from "store/cards/actions";

export const CardCreator = () => {
  const initialValues: CardType = {};

  const dispatch = useDispatch();

  const fieldsList = useSelector(selectFieldsList);

  useEffect(() => {
    dispatch(getAllFieldAction());
  }, []);

  fieldsList?.forEach(({ type, name }) => {
    initialValues[name] = type !== "checkbox" ? "" : false;
  });

  return (
    <Box>
      {!!Object.keys(initialValues).length && (
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => dispatch(saveCardAction(values))}
          validationSchema={validateSchemaCard<FieldStateType>(fieldsList)}
        >
          {({ values, errors, touched, handleChange, isValid, dirty }) => (
            <Form>
              <Box className="FieldsList">
                {fieldsList.map(({ id, name, type, options, required }) => (
                  <Box key={id} pt={1}>
                    {type === "text" && (
                      <TextField
                        fullWidth
                        size="small"
                        label={`${name}${required && "*"}`}
                        name={name}
                        error={!!(touched[name] && errors[name])}
                        helperText={touched[name] && errors[name]}
                        onChange={handleChange}
                      />
                    )}
                    {type === "checkbox" && (
                      <FormControlLabel
                        labelPlacement="start"
                        sx={{ padding: "0", margin: "0" }}
                        label={name}
                        control={
                          <Checkbox name={name} onChange={handleChange} />
                        }
                      />
                    )}
                    {type === "select" && (
                      <FormControl fullWidth size="small">
                        <InputLabel id="select-label-card">{name}</InputLabel>
                        <Select
                          fullWidth
                          size="small"
                          value={values[name]}
                          label={`${name}`}
                          name={name}
                          error={!!(touched[name] && errors[name])}
                          onChange={handleChange}
                        >
                          {options.map(({ id, value }) => (
                            <MenuItem key={id} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </Box>
                ))}
                <Box textAlign="center" pt={2}>
                  <Button
                    variant="outlined"
                    type="submit"
                    disabled={!isValid && !dirty}
                  >
                    <SaveIcon fontSize="small" />
                    Save
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
};
