import { Row, Col, ButtonGroup } from "react-bootstrap";
import BigGlyf from "./BigGlyf";

export default function ContactCards() {
  return (
    <Row>
      <Col style={{ textAlign: "center" }}>
        <ButtonGroup style={{ width: "90%" }}>
          <BigGlyf name="twitter" href="https://twitter.com/evantahler" />
          <BigGlyf name="linkedin" href="https://linkedin.com/in/evantahler" />
          <BigGlyf name="inbox" href="mailto:evan@evantahler.com" />
        </ButtonGroup>
      </Col>
    </Row>
  );
}
