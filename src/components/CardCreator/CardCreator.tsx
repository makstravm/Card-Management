import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import { getAllFieldction } from "store/fields/actions";
import { selectFieldsList } from "store/fields/selectors";

import { CardCreatorText } from "./CardCreatorText/CardCreatorText";
import { CardCreatorCheckbox } from "./CardCreatorCheckbox/CardCtreatorCheckbox";
import { CardCreatorSelect } from "./CardCreatorSelect/CardCreatorSelect";

export const CardCreator = () => {
  const dispatch = useDispatch();

  const fieldsList = useSelector(selectFieldsList);

  const [card, setCard] = useState({});

  useEffect(() => {
    dispatch(getAllFieldction());
  }, []);

  const onSave = () => {};

  return (
    <Box className="FieldsList">
      {fieldsList.map(({ id, name, type, options, required }) => (
        <Box key={id} pt={1}>
          {type === "text" && (
            <CardCreatorText
              name={name}
              required={required}
              card={card}
              handleChangeCard={setCard}
            />
          )}
          {type === "checkbox" && (
            <CardCreatorCheckbox
              name={name}
              card={card}
              handleChangeCard={setCard}
            />
          )}
          {type === "select" && (
            <CardCreatorSelect
              name={name}
              options={options}
              card={card}
              handleChangeCard={setCard}
            />
          )}
        </Box>
      ))}
      <Box textAlign="center" pt={2}>
        <Button variant="outlined" onClick={onSave}>
          <SaveIcon fontSize="small" />
          Save
        </Button>
      </Box>
    </Box>
  );
};
