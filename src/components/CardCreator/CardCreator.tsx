import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";

import { Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import { Btn } from "components/common/Btn/Btn";

import { getAllFieldAction } from "store/fields/actions";
import { selectFieldsListAndInitValFormik } from "store/fields/selectors";
import { FieldStateType } from "store/fields/types";
import { editCardAction, saveCardAction } from "store/cards/actions";
import { CardType } from "store/cards/types";

import { validateSchemaCard } from "helpers/createCardValidSchema/createCardValidSchema";
import { renderFieldByType } from "helpers/renderFieldByType/renderFieldByType";

import { CardCreatorType } from "./types";

import "./style.scss";

export const CardCreator = ({ card }: CardCreatorType) => {
  const dispatch = useDispatch();

  const { fieldsList, initialValues } = useSelector(
    selectFieldsListAndInitValFormik
  );

  useEffect(() => {
    dispatch(getAllFieldAction());
  }, []);

  const onSave = (values: CardType | Omit<CardType, "id">) => {
    if (card) {
      dispatch(editCardAction(values));
    } else {
      dispatch(saveCardAction(values));
    }
  };

  return (
    <Box>
      {!!Object.keys(initialValues).length && (
        <Formik
          initialValues={card || initialValues}
          onSubmit={async (values) => onSave(values)}
          validationSchema={validateSchemaCard<FieldStateType>(fieldsList)}
        >
          {(formik) => (
            <Form>
              <Box className="card-create">
                {fieldsList.map((field) => (
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
                  disabled={!formik.isValid && !formik.dirty}
                  icon={<SaveIcon fontSize="small" />}
                />
              </Box>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
};
