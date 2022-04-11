import * as Yup from "yup";

Yup.addMethod(Yup.array, "unique", function (field, message) {
  return this.test("unique", message, function (array) {
    const uniqueData = Array.from(
      new Set(array.map((row) => row[field]?.toLowerCase()))
    );

    const isUnique = array.length === uniqueData.length;

    if (isUnique) {
      return true;
    }
    const index = array.findIndex(
      (row, i) => row[field]?.toLowerCase() !== uniqueData[i]
    );

    if (array?.[index]?.[field] === "") {
      return this.createError({
        path: `${this.path}.${index}.${field}`,
        message: "Field cann't contain spaces",
      });
    }

    return this.createError({
      path: `${this.path}.${index}.${field}`,
      message,
    });
  });
});

export const optionsValidationSchema = Yup.object({
  options: Yup.array().unique<any>("value", "Please provide a unique number."),
});
