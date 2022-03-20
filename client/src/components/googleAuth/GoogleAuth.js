import axios from "../axios";
import { React, useState } from "react";
import GoogleLogin from "react-google-login";

const success = (res, type) => {
  const values = { email: res.profileObj.email, username: res.profileObj.name };
  const request = {
    register: "/googleRegister",
    login: "/googleLogin",
  };
  return axios.post(request[type], values).then().catch();
};

function GoogleAuth({ body, Open, type }) {
  const [error, setError] = useState("");
  return (
    <>
      {error.length > 0 && <p>{error}</p>}
      <GoogleLogin
        clientId="225659178625-b5b5bm2mgqfg3mldihlpqee7p7q7g4h2.apps.googleusercontent.com"
        buttonText={body}
        onSuccess={(res) => {
          success(res, type)
            .then(() => {
              Open(false);
            })
            .catch((err) => {
              setError(err.response.data.message);
              setTimeout(() => setError(""), 5000);
            });
        }}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
}

export default GoogleAuth;
