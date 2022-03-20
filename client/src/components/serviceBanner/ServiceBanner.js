import React from "react";
import banner from "../../images/waterService/waterServiceBanner.svg";

function ServiceBanner() {
  return (
    <img
      src={banner}
      style={{ width: "100%", flex: "1" }}
      alt="service Banner"
    />
  );
}

export default ServiceBanner;
