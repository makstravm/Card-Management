import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFieldction } from "store/fields/actions";
import { selectFieldsList } from "store/fields/selectors";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import "./style.scss";

export const FieldsList = () => {
  const dispatch = useDispatch();

  const fieldsList = useSelector(selectFieldsList);

  useEffect(() => {
    dispatch(getAllFieldction());
  }, []);

  return (
    <Box className="FieldsList">
      {fieldsList.map((field) => (
        <FieldsItem key={field.id} field={field} />
      ))}
    </Box>
  );
};

const FieldsItem = ({ field: { name, type, required, options } }: any) => {
  const [showOptions, setShowOPtions] = useState<boolean>(false);

  return (
    <Paper>
      <Grid
        sx={{
          margin: "0 5px 10px 5px",
          padding: " 0 15px 0 15px",
          width: "100%",
        }}
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid className="FieldsList__name" xs={4}>
          <Typography>{name}</Typography>
          {required && <Typography color="red">*</Typography>}
          {type === "select" && (
            <IconButton onClick={() => setShowOPtions(!showOptions)}>
              <KeyboardArrowDownIcon />
            </IconButton>
          )}
        </Grid>
        <Grid>
          <Typography align="center"> {type}</Typography>
        </Grid>
        <Grid>
          <Box>
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      {showOptions && (
        <Stack spacing={1} mb={2}>
          <Divider />
          {options.map((o) => (
            <Typography variant="subtitle2" pl={5} key={o.id}>
              {o.value}
            </Typography>
          ))}
        </Stack>
      )}
    </Paper>
  );
};
