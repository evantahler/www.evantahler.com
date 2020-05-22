import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import BigGlyf from "../components/BigGlyf";
import Page from "../components/templates/page";
import JumboImage from "../components/jumboImage";
import Calendly from "../components/calendly";

const title = "Evan Tahler: Contact";

function ContactPage() {
  return (
    <Page title={title}>
      <>
        <h1>Contact</h1>
        <hr />

        <JumboImage src="/static/images/contact.jpg" />

        <p>Let's chat!</p>
        <p>
          If you are looking to hire me on a contractor basis, please reach out
          via{" "}
          <a href="https://www.delicioushat.com" target="_new">
            Delicious Hat
          </a>
          , my Web Technology Development and Consulting firm.
        </p>
        <p>
          If you are looking for help with ActionHero, please{" "}
          <a href="https://www.actionherojs.com/community" target="_new">
            join the ActionHero community
          </a>
        </p>

        <hr />

        <Row>
          <Col md={4} style={{ textAlign: "center" }}>
            <a target="_new" href="https://twitter.com/evantahler">
              <BigGlyf name="twitter" />
              <br /> <Badge variant="success">@evantahler</Badge>
            </a>
          </Col>
          <Col md={4} style={{ textAlign: "center" }}>
            <a target="_new" href="https://linkedin.com/in/evantahler">
              <BigGlyf name="linkedin" />
              <br /> <Badge variant="info">@evantahler</Badge>
            </a>
          </Col>
          <Col md={4} style={{ textAlign: "center" }}>
            <a target="_new" href="mailto:evan@evantahler.com">
              <BigGlyf name="inbox" />
              <br />
              <Badge variant="primary">evan@evantahler.com</Badge>
            </a>
          </Col>
        </Row>

        <hr />
        <p>Or schedule a chat with me!</p>
        <Calendly />
      </>
    </Page>
  );
}

export default ContactPage;
