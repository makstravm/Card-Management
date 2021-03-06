import React from "react";

import { FieldArray } from "formik";

import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

import { Btn } from "components/common/Btn/Btn";

import { OptionsType } from "store/fields/types";

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
                value={values[options]?.[i].value}
                name={`options.${[i]}.value`}
                onChange={handleChange}
                error={!!errors?.options?.[i]?.value}
                helperText={errors?.options?.[i]?.value}
                inputProps={{ "data-testid": `input-option-${i}` }}
              />
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => move(i, i - 1)}
                size="small"
                data-testid={`move-up-${i}`}
              >
                <ArrowCircleUpIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => move(i, i + 1)}
                size="small"
                data-testid={`move-down-${i}`}
              >
                <ArrowCircleDownIcon />
              </IconButton>
            </Grid>

            {values.options.length > 2 && (
              <Grid item>
                <IconButton
                  onClick={() => remove(i)}
                  size="small"
                  data-testid={`btn-delete-${i}`}
                >
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
            handleClick={() => push({ id: String(Math.random()), value: "" })}
            icon={<AddIcon fontSize="small" />}
          />
        </Box>
      </>
    )}
  </FieldArray>
);
