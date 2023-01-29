import React from "react";

import error from "../assets/images/error.gif";

const Error = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <img src={error} />
    </div>
  );
};

export default Error;
