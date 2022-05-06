import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Box, Divider, Stack } from "@mui/material";

import { Btn } from "components/common/Btn/Btn";

import { StoreContext } from "store/index";

import { OptionsType } from "store/fields/types";
import { GroupCardsBtnPropsType } from "./types";

export const GroupCardsBtn = observer(
  ({ title, handleChangeGroupBy }: GroupCardsBtnPropsType) => {
    const { groupOptions } = useContext(StoreContext).fields;

    return (
      <Box textAlign="right">
        <Stack direction="row" divider={<Divider flexItem />}>
          {!!groupOptions.length &&
            groupOptions.map(({ id, value }: OptionsType) => (
              <Btn
                key={id}
                variantBtn={title === value ? "outlined" : "text"}
                title={value}
                handleClick={() => handleChangeGroupBy(value)}
              />
            ))}
        </Stack>
      </Box>
    );
  }
);
