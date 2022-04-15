import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";

import { Box, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import { getAllFieldAction } from "store/fields/actions";
import { selectFieldsListAndInitValFormik } from "store/fields/selectors";

import { FieldStateType } from "store/fields/types";
import { validateSchemaCard } from "helpers/createCardValidSchema/createCardValidSchema";
import { saveCardAction } from "store/cards/actions";
import { renderFieldByType } from "helpers/renderFieldByType/renderFieldByType";

export const CardCreator = () => {
  const dispatch = useDispatch();

  const { fieldsList, initialValues } = useSelector(
    selectFieldsListAndInitValFormik
  );

  useEffect(() => {
    dispatch(getAllFieldAction());
  }, []);

  return (
    <Box>
      {!!Object.keys(initialValues).length && (
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => dispatch(saveCardAction(values))}
          validationSchema={validateSchemaCard<FieldStateType>(fieldsList)}
        >
          {(formik) => (
            <Form>
              <Box className="FieldsList">
                {fieldsList.map((field) => (
                  <Box key={field.id} pt={1}>
                    {renderFieldByType(field, formik)}
                  </Box>
                ))}
                <Box textAlign="center" pt={2}>
                  <Button
                    variant="outlined"
                    type="submit"
                    disabled={!formik.isValid && !formik.dirty}
                  >
                    <SaveIcon fontSize="small" />
                    Save
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
};
