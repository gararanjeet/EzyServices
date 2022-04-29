import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

const useAuth = () => {
  return useContext(LoginContext);
};

export default useAuth;
