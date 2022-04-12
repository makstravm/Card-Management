import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFieldction } from "store/fields/actions";
import { selectFieldsList } from "store/fields/selectors";

export const FieldsList = () => {
  const dispatch = useDispatch();

  const fieldsList = useSelector(selectFieldsList);

  useEffect(() => {
    dispatch(getAllFieldction());
  }, []);

  return (
    <Box>
      {fieldsList.map(({ name, type, id }) => (
        <Grid
          key={id}
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={4}>
            <Typography>{name}</Typography>
          </Grid>
          <Grid>
            <Typography align="center"> {type}</Typography>
          </Grid>
          <Grid item>
            <Box>
              <Button>edit</Button>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};
