import React from "react";
import logo from "../../images/waterService/waterServiceLogo.svg";

function ServiceLogo(props) {
  return <img src={props.logo || logo} style={props.style} alt="servie logo" />;
}

export default ServiceLogo;
