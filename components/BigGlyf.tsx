import React from "react";
import FontAwesome from "react-fontawesome";
import { Button } from "react-bootstrap";

export default function BigGlyf({ name, href }) {
  return (
    <Button
      style={{ minWidth: 100 }}
      size="lg"
      variant="light"
      href={href}
      target="_blank"
    >
      <FontAwesome name={name} />
      {/* <br />
      <small> {name}</small> */}
    </Button>
  );
}
