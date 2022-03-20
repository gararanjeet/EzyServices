import React, { createContext, useEffect, useState } from "react";
import axios from "../components/axios";

const AuthContext = createContext();

function AuthContextProvide(props) {
  const userData = {
    loggedIn: undefined,
    id: undefined,
    username: undefined,
    type: undefined,
    role: undefined,
  };
  const [loginStatus, setLoginStatus] = useState(userData);

  const getLoggedIn = async () => {
    const loggedInRes = await axios.get("/isLogedIn");
    setLoginStatus(loggedInRes.data);
    console.log(loginStatus);
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loginStatus, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

export { AuthContextProvide };
