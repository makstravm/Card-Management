import React, { useEffect } from "react";

import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { getAllFieldAction } from "store/fields/actions";
import { selectFieldsList } from "store/fields/selectors";

import { FieldsItem } from "./FieldsItem/FieldsItem";

import "./style.scss";

export const FieldsList = () => {
  const dispatch = useDispatch();

  const fieldsList = useSelector(selectFieldsList);

  useEffect(() => {
    dispatch(getAllFieldAction());
  }, []);

  return (
    <Box className="fields-list">
      {fieldsList?.map((field) => (
        <FieldsItem key={field.id} field={field} />
      ))}
    </Box>
  );
};
