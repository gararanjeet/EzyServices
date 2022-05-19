import React from "react";
import success from "../../images/success.svg";
import fail from "../../images/failed.svg";

function Notify({ type, text }) {
  return (
    <div>
      <img
        src={type === "success" ? success : fail}
        style={{ width: "3rem", marginBottom: "1.5rem" }}
        alt="icon"
      />
      <h3>{text}</h3>
    </div>
  );
}

export default Notify;
