import React, { useState } from "react";

export const LoginContext = React.createContext({});

function LoginProvider({ children }) {
  const [auth, setAuth] = useState({});
  return (
    <LoginContext.Provider value={{ auth, setAuth }}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
