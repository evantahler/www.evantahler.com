import React from "react";
import { Row, Col } from "react-bootstrap";

function JumboImage({ src }) {
  const style = {
    height: 500,
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    objectFit: "cover" as "cover",
    borderRadius: 30,
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <img style={style} src={src} />
        </Col>
      </Row>
    </>
  );
}

export default JumboImage;
