import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch } from "react-redux";
import { saveFieldAction } from "store/fields/actions";
import { FieldTypes } from "store/fields/types";

export const fieldTypes = ["text", "checkbox", "select"];

export const FieldsCreator = () => {
  const dispatch = useDispatch();

  const [typeField, setTypeField] = useState<FieldTypes>("text");

  const [nameField, setNameField] = useState<string>("");

  const [checked, setChecked] = useState<boolean>(false);

  const changeTypeField = (event: SelectChangeEvent) =>
    setTypeField(event.target.value as FieldTypes);

  const changeNameField = (e: ChangeEvent<HTMLInputElement>) =>
    setNameField(e.currentTarget.value);

  const changeChekedRequired = (e: ChangeEvent<HTMLInputElement>) =>
    setChecked(e.currentTarget.checked);

  const onSaveField = () =>
    dispatch(
      saveFieldAction({ name: nameField, type: typeField, required: checked })
    );

  return (
    <Box pt={2}>
      <Box pb={2}>
        <FormControl>
          <InputLabel id="select-label">Type</InputLabel>
          <Select
            value={typeField}
            onChange={changeTypeField}
            size="small"
            label="Type"
            labelId="select-label"
          >
            {fieldTypes.map((fieldType: FieldTypes) => (
              <MenuItem key={fieldType} value={fieldType}>
                {fieldType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Divider />
      <Box pb={2}>
        <TextField
          value={nameField}
          onChange={changeNameField}
          size="small"
          label="Name Field"
        />
        {typeField === "text" && (
          <FormControlLabel
            labelPlacement="start"
            sx={{ paddingLeft: "10px" }}
            label="Required"
            control={
              <Checkbox checked={checked} onChange={changeChekedRequired} />
            }
          />
        )}
      </Box>
      <Box textAlign="center" pt={2}>
        <Button variant="outlined" color="primary" onClick={onSaveField}>
          <SaveIcon fontSize="small" />
          <Typography variant="button">Save</Typography>
        </Button>
      </Box>
    </Box>

    //   <>
    //     {cardFields?.map(({ id, name, value }: any) => (
    //       <FieldsCard
    //         key={id}
    //         id={id}
    //         nameField={name}
    //         valueField={value}
    //         saveFieldName={saveFieldName}
    //         saveFieldValue={saveFieldValue}
    //       />
    //     ))}
    //     <Box pb={2} pt={3} textAlign="center">
    //       <Button variant="outlined" color="primary" onClick={createField}>
    //         <AddCircleIcon fontSize="small" />
    //         <Typography variant="button">Add Field</Typography>
    //       </Button>
    //       <Button onClick={() => console.log(cardFields)}>Save</Button>
    //     </Box>
    //   </>
  );
};

// const FieldsCard = ({
//   id,
//   nameField,
//   valueField,
//   saveFieldName,
//   saveFieldValue,
// }: any) => {
//   const onSaveFieldName = (value: string) => saveFieldName(id, value);

//   const onSaveFieldValue = (value: string) => saveFieldValue(id, value);

//   return (
//     <div style={{ paddingBottom: "10px" }}>
//       <Field nameField="Name" value={nameField} changeValue={onSaveFieldName} />
//       <FieldValue value={valueField} changeValue={onSaveFieldValue} />
//     </div>
//   );
// };
