import axios from "../axios";
import * as yup from "yup";
require("yup-phone");

let initialValues = {
  username: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  role: "USER",
  type: "CUSTOMER",
};

const onSubmit = (values) => {
  console.log(values);
  return axios.post("/authenticate/register", values);
};

const validationSchema = yup.object({
  userName: yup
    .string()
    .max(30, "Name should not be greater than 15 charecters")
    .min(3, "Name should not be less than 3 charecters")
    .required("Required!"),
  email: yup.string().email("Invalid email format").required("Required!"),
  phone: yup.string().required("required").phone("Should be of 10 charecters"),
  password: yup
    .string()
    .min(6, "Password should not be less than 6 charecters")
    .max(15, "Password should not be greater than 15 charecters")
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("required"),
  type: yup.string().required("type is required"),
  role: yup.string().required("role is required"),
});

export { initialValues, onSubmit, validationSchema };
