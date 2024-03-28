import { Row, Col, ButtonGroup, Button } from "react-bootstrap";
import BigGlyf from "./BigGlyf";

export default function ContactCards({ variant }) {
  return (
    <Row>
      <Col style={{ textAlign: "center" }}>
        <ButtonGroup style={{ width: "100%" }}>
          <BigGlyf
            name="twitter"
            href="https://twitter.com/evantahler"
            variant={variant}
          />
          <BigGlyf
            name="linkedin"
            href="https://linkedin.com/in/evantahler"
            variant={variant}
          />
          <BigGlyf
            name="github"
            href="https://github.com/evantahler"
            variant={variant}
          />
          <BigGlyf
            name="inbox"
            href="mailto:evan@evantahler.com"
            variant={variant}
          />
        </ButtonGroup>
      </Col>
    </Row>
  );
}
