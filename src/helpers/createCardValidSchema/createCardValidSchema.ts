import * as Yup from "yup";

export const createYupSchema = (schema: any, config: any) => {
  const { name, type, required } = config;

  if (type === "text" && required) {
    schema[name] = Yup.string().required("Field required");
  }
  if (type === "text" && !required) {
    schema[name] = Yup.string();
  }
  if (type === "select") {
    schema[name] = Yup.string().required("Field required");
  }

  return schema;
};

export const validateSchemaCard = <T>(data: T[]) => {
  const yupSchema = data.reduce(createYupSchema, {});

  return Yup.object().shape(yupSchema);
};
