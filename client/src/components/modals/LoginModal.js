import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import GoogleAuth from "../googleAuth/GoogleAuth";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { initialValues, onSubmit, validationSchema } from "./loginValidatoin";
import AuthContext from "../../context/AuthContext";

function LoginModal({ Open }) {
  const [error, setError] = useState("");
  // const { getLoggedIn } = useContext(AuthContext);
  const [cookie, setCookie] = useCookies(["accessToken"]);

  const updateCookie = (key, value) => {
    let expires = new Date();
    expires.setTime(expires.getTime() + 86400000);
    setCookie(key, value, {
      path: "/",
      expires,
      // httpOnly: true,
      // hostOnly: false,
    });
  };
  return (
    <LoginPopup>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          onSubmit(values)
            .then((res) => {
              const { id, type, user_name, accessToken } = res.data;
              console.log(id);
              updateCookie("id", id);
              updateCookie("type", type);
              updateCookie("user_name", user_name);
              updateCookie("accessToken", accessToken);
              Open(false);
            })
            .catch((err) => {
              console.log(err.response);
              setError(err.response.data.message);
              setTimeout(() => setError(""), 5000);
            });
        }}
        validationSchema={validationSchema}
      >
        <Form style={{ textAlign: "center" }}>
          <Heading>Login </Heading>
          <GoogleAuth
            body="Login using Google"
            open={Open}
            type="login"
          ></GoogleAuth>
          {error.length > 0 && <p>{error}</p>}
          <Lable>Email</Lable>
          <ErrorMessage name="email" />
          <Field
            name="email"
            type="email"
            placeholder="email@gmail.com"
            style={inputStyle}
          />

          <Lable>Password</Lable>
          <ErrorMessage name="password" />
          <Field
            name="password"
            type="password"
            placeholder="password"
            style={inputStyle}
          />

          <Submit>Login</Submit>
        </Form>
      </Formik>
    </LoginPopup>
  );
}

export default LoginModal;

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
  font-size: 1.5rem;
  margin-left: 1.5em;
  text-align: left;
  display: block;
  margin-bottom: 1rem;
`;

const inputStyle = {
  display: "block",
  fontSize: "1.3rem",
  padding: "0.5em",
  color: "#d5d421",
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
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #d5d421;
  :hover {
    color: #878787;
  }
`;
