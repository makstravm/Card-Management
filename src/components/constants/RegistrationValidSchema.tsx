import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Field required"),
  lastName: Yup.string().required("Field required"),
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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password don't match")
    .trim("Field cann't contain spaces")
    .required(),
});

export default registerSchema;
