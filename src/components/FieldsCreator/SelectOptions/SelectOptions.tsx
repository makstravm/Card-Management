import React from "react";

import { v1 } from "uuid";
import { FieldArray } from "formik";

import {
  Box,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

import { OptionsType } from "store/fields/types";
import { Btn } from "components/common/Btn/Btn";
import { SelectOptionsPropsType } from "./types";

export const SelectOptions = ({
  options,
  formik: { values, errors, handleChange },
}: SelectOptionsPropsType) => (
  <FieldArray name={`${options}`}>
    {({ push, move, remove }) => (
      <>
        {values.options.map(({ id }: OptionsType, i: number) => (
          <Grid key={id} container alignItems="center" pb={2}>
            <Grid item>
              <TextField
                size="small"
                label="Name Option"
                name={`options.${[i]}.value`}
                onChange={handleChange}
                error={!!errors?.options?.[i].value}
                helperText={errors?.options?.[i].value}
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
        {values.options.length < 2 && (
          <Box textAlign="center">
            <Typography
              variant="caption"
              color={typeof errors?.options === "string" && "red"}
            >
              Minimum 2 options
            </Typography>
          </Box>
        )}
        <Box pb={2} textAlign="center">
          <Btn
            title="Add"
            variantBtn="text"
            handleClick={() => push({ id: v1(), value: "" })}
            icon={<AddIcon fontSize="small" />}
          />
        </Box>
      </>
    )}
  </FieldArray>
);
