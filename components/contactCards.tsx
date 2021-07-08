import { Alert, Badge, Row, Col } from "react-bootstrap";
import BigGlyf from "./BigGlyf";

export default function ContactCards() {
  return (
    <Alert variant="dark">
      <Row>
        <Col md={4} style={{ textAlign: "center" }}>
          <a target="_new" href="https://twitter.com/evantahler">
            <BigGlyf name="twitter" />
          </a>
        </Col>
        <Col md={4} style={{ textAlign: "center" }}>
          <a target="_new" href="https://linkedin.com/in/evantahler">
            <BigGlyf name="linkedin" />
          </a>
        </Col>
        <Col md={4} style={{ textAlign: "center" }}>
          <a target="_new" href="mailto:evan@evantahler.com">
            <BigGlyf name="inbox" />
          </a>
        </Col>
      </Row>
    </Alert>
  );
}
