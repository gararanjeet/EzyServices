import * as yup from "yup";
import axios from "../axios";
const initialValues = { email: "", password: "" };

const onSubmit = (values) => {
  return axios.post("/authenticate/login", values);
};

const onSuccess = (res) => {
  const { id, type, role, token } = res.data;
  const logedin = true;
  let user =
    type.toLowerCase() === "customer" && role.toLowerCase() === "user"
      ? true
      : false;

  let serviceProvider =
    type.toLowerCase() === "service_provider" ? true : false;

  let manager =
    type.toLowerCase() === "manager" && role.toLowerCase() === "super_admin"
      ? true
      : false;
  return [id, type, role, token, logedin, user, serviceProvider, manager];
};

const validationSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Required!"),
  password: yup
    .string()
    .min(6, "Password should not be less than 6 charecters")
    .max(15, "Password should not be greater than 15 charecters")
    .required("Required"),
});

export { initialValues, onSubmit, validationSchema, onSuccess };
