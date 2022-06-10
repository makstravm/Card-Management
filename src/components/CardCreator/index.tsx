import React, { useContext, useEffect } from "react";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";

import { Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import { Btn } from "components/common/Btn/Btn";

import { FieldStateType } from "store/fields/types";
import { CardType } from "store/cards/types";
import { StoreContext } from "store/index";

import { validateSchemaCard } from "helpers/createCardValidSchema";
import { renderFieldByType } from "helpers/renderFieldByType";

import { CardCreatorType } from "./types";

import "./style.scss";

export const CardCreator = observer(({ card }: CardCreatorType) => {
  const {
    fields: {
      fieldsListAndInitValFormik: { initialValues, fieldsList },
      getAllFieldAction,
    },
    cards: { editCardAction, saveCardAction },
  } = useContext(StoreContext);

  useEffect(() => {
    getAllFieldAction();
  }, []);

  const onSave = (values: CardType | Omit<CardType, "id">) => {
    if (card) {
      editCardAction(values);
    } else {
      saveCardAction(values);
    }
  };

  return (
    <Box>
      {!!Object.keys(initialValues).length && (
        <Formik
          initialValues={card || initialValues}
          onSubmit={async (values) => onSave(values)}
          validationSchema={validateSchemaCard(fieldsList)}
        >
          {(formik) => (
            <Form>
              <Box className="card-create">
                {fieldsList.map((field: FieldStateType) => (
                  <Box key={field.id} pt={1}>
                    {renderFieldByType(field, formik)}
                  </Box>
                ))}
              </Box>
              <Box textAlign="center" pt={2}>
                <Btn
                  title="Save"
                  variantBtn="outlined"
                  handleClick={() => formik.handleSubmit()}
                  disabled={!(formik.isValid && formik.dirty)}
                  icon={<SaveIcon fontSize="small" />}
                />
              </Box>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
});
