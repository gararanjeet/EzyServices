import { React, useState } from "react";
import styled from "styled-components";
import GoogleAuth from "../googleAuth/GoogleAuth";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { initialValues, onSubmit, validationSchema } from "./signupValidation";

function SignupModal({ Open, registerServiceProvider }) {
  const [submitError, setSubmitError] = useState("");

  //Changing the initial values for service provider registration
  if (registerServiceProvider) {
    initialValues.type = "";
    initialValues.role = "";
  }
  console.log(initialValues);
  return (
    <LoginPopup>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values, "in formik");
          onSubmit(values)
            .then(() => {
              console.log("came into success");
              Open(false);
            })
            .catch((err) => {
              console.log("came into error");
              console.log(err.response.data.message);
              setSubmitError(err.response.data.message);
              setTimeout(() => setSubmitError(""), 5000);
            });
        }}
        validationSchema={validationSchema}
      >
        <Form style={{ textAlign: "center" }}>
          <Heading>Register</Heading>
          {/* {submitError.length > 0 && <p>{submitError}</p>} */}
          {/* <GoogleAuth
            body="Signup with Google"
            open={Open}
            type="register"
          ></GoogleAuth> */}
          <Lable>UserName</Lable>
          <ErrorMessage name="userName" />
          <Field name="userName" type="text" style={styleInput} />
          <Lable>Email</Lable>
          <ErrorMessage name="email" />
          <Field name="email" type="email" style={styleInput} />
          <Lable>Phone</Lable>
          <ErrorMessage name="phone" />
          <Field name="phone" type="text" style={styleInput} />
          <Lable>Password</Lable>
          <ErrorMessage name="password" />
          <Field name="password" type="password" style={styleInput} />
          <Lable>Confirm Password</Lable>
          <ErrorMessage name="confirmPassword" />
          <Field name="confirmPassword" type="password" style={styleInput} />
          {registerServiceProvider ? (
            <>
              <Lable>Type</Lable>
              <ErrorMessage name="type" />
              <Field name="type" component="select" style={styleInput}>
                <option>select</option>
                <option value="SERVICE_PROVIDER">Service Provider</option>
              </Field>
              <Lable>Role</Lable>
              <ErrorMessage name="role" />
              <Field component="select" name="role" style={styleInput}>
                <option>select</option>
                <option value="VEHICLE_WATER_SERVICING">Vehicle_Water</option>
              </Field>
            </>
          ) : null}
          <Submit type="submit">Register</Submit>
        </Form>
      </Formik>
    </LoginPopup>
  );
}

export default SignupModal;

const LoginPopup = styled.div`
  color: white;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin: 2rem 0;
  margin-bottom: 3rem;
`;

const Lable = styled.label`
  font-size: 1.2rem;
  margin-left: 1.5em;
  text-align: left;
  display: block;
  margin-bottom: 1rem;
`;

const styleInput = {
  display: "block",
  fontSize: "1.2rem",
  padding: "0.5em",
  color: "white",
  width: "85%",
  marginLeft: "1.5em",
  marginBottom: "2rem",
  backgroundColor: "#878787",
  borderRadius: "5px",
  border: "none",
  outline: "none",
};

const Submit = styled.button`
  border: none;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #d5d421;
  :hover {
    color: #565656;
    cursor: pointer;
  }
`;
