import React from "react";
import FontAwesome from "react-fontawesome";
import { Button } from "react-bootstrap";

export default function BigGlyf({ name }) {
  return (
    <Button size="lg" variant="dark">
      <FontAwesome name={name} />
      {/* <br />
      <small> {name}</small> */}
    </Button>
  );
}
