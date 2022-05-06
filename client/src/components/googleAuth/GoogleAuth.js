import axios from "../axios";
import { React, useState } from "react";
import GoogleLogin from "react-google-login";
import { onSuccess } from "../modals/loginValidatoin";
import { useCookies } from "react-cookie";

const success = (res, type) => {
  const values = { email: res.profileObj.email, username: res.profileObj.name };
  const request = {
    register: "/googleRegister",
    login: "/googleLogin",
  };
  return axios.post(`/authenticate/${request[type]}`, values).then().catch();
};

function GoogleAuth({ body, Open, type }) {
  const [error, setError] = useState("");
  const [cookie, setCookie] = useCookies(["accessToken"]);
  const updateCookie = (props) => {
    let expires = new Date();
    expires.setTime(expires.getTime() + 86400000);
    Object.keys(props).forEach((item) => {
      setCookie(item, props[item], {
        path: "/",
        expires,
      });
    });
  };
  return (
    <>
      {error.length > 0 && <p>{error}</p>}
      <GoogleLogin
        clientId="225659178625-b5b5bm2mgqfg3mldihlpqee7p7q7g4h2.apps.googleusercontent.com"
        buttonText={body}
        onSuccess={(res) => {
          success(res, type)
            .then((res) => {
              const [
                id,
                type,
                role,
                token,
                logedin,
                user,
                serviceProvider,
                manager,
              ] = onSuccess(res);
              console.log(token);
              updateCookie({
                id,
                type,
                role,
                token,
                logedin,
                user,
                serviceProvider,
                manager,
              });
              Open(false);
            })
            .catch((err) => {
              console.log(err);
              setError(err);
              setTimeout(() => setError(""), 5000);
            });
        }}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
}

export default GoogleAuth;
