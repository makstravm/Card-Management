import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { v1 } from "uuid";

export const CardsCreator = () => {
  const [cardFields, setCardFields] = useState<any>([]);

  const createField = () => {
    setCardFields([...cardFields, { id: v1(), name: "", value: "" }]);
  };

  const saveFieldName = (id: string, name: string) => {
    setCardFields(
      cardFields.map(
        (cardField: any) =>
          (cardField.id === id && { ...cardField, id, name }) || cardField
      )
    );
  };

  const saveFieldValue = (id: string, value: string) => {
    setCardFields(
      cardFields.map(
        (cardField: any) =>
          (cardField.id === id && { ...cardField, id, value }) || cardField
      )
    );
  };

  return (
    <>
      {cardFields?.map(({ id, name, value }: any) => (
        <FieldsCard
          key={id}
          id={id}
          nameField={name}
          valueField={value}
          saveFieldName={saveFieldName}
          saveFieldValue={saveFieldValue}
        />
      ))}
      <Box pb={2} pt={3} textAlign="center">
        <Button variant="outlined" color="primary" onClick={createField}>
          <AddCircleIcon fontSize="small" />
          <Typography variant="button">Add Field</Typography>
        </Button>
        <Button onClick={() => console.log(cardFields)}>Save</Button>
      </Box>
    </>
  );
};

const FieldsCard = ({
  id,
  nameField,
  valueField,
  saveFieldName,
  saveFieldValue,
}: any) => {
  const onSaveFieldName = (value: string) => saveFieldName(id, value);

  const onSaveFieldValue = (value: string) => saveFieldValue(id, value);

  return (
    <div style={{ paddingBottom: "10px" }}>
      <Field nameField="Name" value={nameField} changeValue={onSaveFieldName} />
      <FieldValue value={valueField} changeValue={onSaveFieldValue} />
    </div>
  );
};

const Field = ({ type, nameField, value, changeValue }: any) => {
  const changeFieldValue = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => changeValue(e.currentTarget.value);

  return (
    <TextField
      InputLabelProps={(type === "date" && { shrink: true }) || {}}
      type={type}
      value={value}
      onChange={changeFieldValue}
      size="small"
      label={`Field ${nameField}`}
    />
  );
};

const fieldTypes = ["text", "password", "checkbox", "number", "date"];

const FieldValue = ({ value, changeValue }: any) => {
  const [valueType, setValueType] = useState<any>("text");

  const handleChange = (e: SelectChangeEvent) => {
    setValueType(e.target.value);
  };

  return (
    <>
      {valueType !== "checkbox" ? (
        <Field
          type={valueType}
          nameField="Value"
          value={value}
          changeValue={changeValue}
        />
      ) : (
        <Checkbox onChange={(e) => changeValue(e.currentTarget.checked)} />
      )}
      <FormControl>
        <InputLabel id="select-label">Type</InputLabel>
        <Select
          value={valueType}
          onChange={handleChange}
          size="small"
          label="Type"
          labelId="select-label"
        >
          {fieldTypes.map((fieldType: any) => (
            <MenuItem key={fieldType} value={fieldType}>
              {fieldType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
