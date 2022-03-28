import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .trim("Field cann't contain spaces")
    .required("Field required"),
  password: Yup.string()
    .trim("Field cann't contain spaces")
    .matches(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
      message: "Password is incorrect",
    })
    .required("Field required"),
});

export default loginSchema;
