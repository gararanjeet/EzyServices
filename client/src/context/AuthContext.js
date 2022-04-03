import React, { createContext, useEffect, useState } from "react";
import axios from "../components/axios";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

function AuthContextProvide(props) {
  // const userData = {
  //   loggedIn: undefined,
  //   id: undefined,
  //   username: undefined,
  //   type: undefined,
  //   role: undefined,
  // };
  const [loginStatus, setLoginStatus] = useState({});
  const [cookie, setCookie] = useCookies();

  const getLoggedIn = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        token: `Bearer ${cookie.accessToken}`,
      },
    };
    const loggedInRes = await axios.get("/isLogedIn", config);
    setLoginStatus(loggedInRes.data);
    console.log(loginStatus);
  };

  useEffect(() => {
    getLoggedIn();
  },[]);

  return (
    <AuthContext.Provider value={{ loginStatus, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

export { AuthContextProvide };
