import React from "react";

import { v1 } from "uuid";
import { FieldArray, Form, Formik } from "formik";

import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

import { OptionsType } from "store/fields/types";
import { OptionsStateType, SelectOptionsPropsType } from "./types";

const optionsItems: OptionsStateType = {
  options: [
    { id: v1(), value: "" },
    { id: v1(), value: "" },
  ],
};

export const SelectOptions = ({
  onSave,
  validationSchema,
}: SelectOptionsPropsType) => (
  <Formik
    initialValues={optionsItems}
    onSubmit={(values) => onSave(values)}
    validationSchema={validationSchema}
  >
    {({ values, errors, handleChange, isValid, dirty }: any) => (
      <>
        <Divider textAlign="left" sx={{ paddingBottom: "15px" }}>
          <Typography variant="subtitle2">Options</Typography>
        </Divider>
        <Form>
          <FieldArray name="options">
            {({ push, move, remove }) => (
              <>
                {values.options.map(({ id }: OptionsType, i: number) => (
                  <Grid key={id} container alignItems="center" pb={2}>
                    <Grid item>
                      <TextField
                        size="small"
                        label="Name Option"
                        name={`options.${i}.value`}
                        onChange={handleChange}
                        error={!!errors.options?.[i]?.value}
                        helperText={errors.options?.[i]?.value}
                      />
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => move(i, i - 1)} size="small">
                        <ArrowCircleUpIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => move(i, i + 1)} size="small">
                        <ArrowCircleDownIcon />
                      </IconButton>
                    </Grid>
                    {values.options.length > 2 && (
                      <Grid item>
                        <IconButton onClick={() => remove(i)} size="small">
                          <DeleteForeverIcon />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                ))}
                <Box pb={2} textAlign="center">
                  <Button
                    variant="text"
                    onClick={() => push({ id: v1(), value: "" })}
                  >
                    <AddIcon fontSize="small" />
                    Add
                  </Button>
                </Box>
              </>
            )}
          </FieldArray>
          <Box display="flex" justifyContent="center">
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
      </>
    )}
  </Formik>
);
