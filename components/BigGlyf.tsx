import React from "react";
import FontAwesome from "react-fontawesome";

function BigGlyf({ name }) {
  return (
    <span
      style={{
        fontSize: 30,
        fontWeight: "bold",
        color: "black",
      }}
    >
      <FontAwesome name={name} />
    </span>
  );
}

export default BigGlyf;
