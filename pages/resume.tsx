import React from "react";
import { Alert, Row, Col } from "react-bootstrap";
import Page from "../components/templates/page";
import JumboImage from "../components/jumboImage";

const title = "Evan Tahler: Resume";

const logoStyle = {
  maxWidth: 100,
  maxHeight: 100
};

function ResumePage() {
  return (
    <Page title={title}>
      <>
        <h1>Resume</h1>
        <hr />

        <JumboImage src="/static/images/resume.jpg" />

        <Alert variant="success">
          <a href="/static/evan-tahler-resume.pdf">
            <strong>Download Full Resume</strong>
          </a>
        </Alert>

        <p>
          Evan is launching on a new stealth startup. Prior to that, he was the
          Chief Product Officer at{" "}
          <a target="_new" href="https://www.voom.flights">
            Voom, an Airbus Company
          </a>
          , providing an urban air mobility to cities around the world.
        </p>

        <p>
          Evan has deep expertise in building the technical side of B2C products
          as well as the teams required to do so. He’s helped companies like{" "}
          <a target="_new" href="https://www.disney.com">
            Disney
          </a>
          ,{" "}
          <a target="_new" href="https://www.taskrabbit.com">
            TaskRabbit
          </a>
          ,{" "}
          <a target="_new" href="https://www.modcloth.com">
            ModCloth
          </a>
          , and{" "}
          <a target="_new" href="https://www.airbus.com">
            Airbus
          </a>{" "}
          launch new global digital initiatives. He is named on a number of
          patents focusing on mobile interactions and digital entertainment.
          Evan is an open-source innovator, and frequent speaker at software
          development conferences focusing on Product Managment, Node.JS, Rails,
          and databases.
        </p>

        <p>
          Evan holds a Masters in Entertainment Technology and BS in Mechanical
          Engineering from{" "}
          <a
            target="_new"
            href="https://www.cmu.edu/homepage/creativity/2014/fall/the-greater-good.shtml"
          >
            Carnegie Mellon University
          </a>
          .
        </p>

        <br />

        <Row style={{ textAlign: "center" }}>
          <Col md={2}>
            <img style={logoStyle} src="/static/images/logos/actionhero.png" />
          </Col>
          <Col md={2}>
            <img style={logoStyle} src="/static/images/logos/taskrabbit.png" />
          </Col>
          <Col md={2}>
            <img style={logoStyle} src="/static/images/logos/airbus.png" />
          </Col>
          <Col md={2}>
            <img style={logoStyle} src="/static/images/logos/voom.png" />
          </Col>
          <Col md={2}>
            <img style={logoStyle} src="/static/images/logos/modcloth.jpg" />
          </Col>
          <Col md={2}>
            <img style={logoStyle} src="/static/images/logos/disney.png" />
          </Col>
        </Row>
      </>
    </Page>
  );
}

export default ResumePage;
