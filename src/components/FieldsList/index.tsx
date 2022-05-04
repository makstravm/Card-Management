import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Box } from "@mui/material";

import { StoreContext } from "store/index";
import { FieldsItem } from "./FieldsItem";

import "./style.scss";

export const FieldsList = observer(() => {
  const { fieldsList, getAllFieldAction } = useContext(StoreContext).fields;

  useEffect(() => {
    getAllFieldAction();
  }, []);

  return (
    <Box className="fields-list">
      {fieldsList?.map((field) => (
        <FieldsItem key={field.id} field={field} />
      ))}
    </Box>
  );
});
