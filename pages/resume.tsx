import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import JumboImage from "../components/jumboImage";
import Image from "next/image";
import SEO from "../components/seo";

const logoSize = 100;

function ResumePage() {
  return (
    <>
      <SEO title="Evan Tahler: Resume" path="/resume" />

      <h1>Resume</h1>
      <hr />

      <JumboImage src="/images/resume-2.jpg" />

      <p>
        Evan Tahler is the Platform Engineering Manager at{" "}
        <a href="https://www.airbyte.com" target="_new">
          Airbyte
        </a>
        .
      </p>

      <p>
        Prior to that, he was the CTO and co-founder of Grouparoo, which was
        acquired by Airbyte. Evan's expertise lies in building the technical
        side of digital products, and growing the teams required to do so. He’s
        helped companies like{" "}
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
        launch new global digital initiatives, and has co-founded multiple
        startups. He is named on a number of patents focusing on mobile
        interactions and digital entertainment. Evan is an open-source
        innovator, and frequent speaker at software development conferences
        focusing on Product Management, Node.JS, Typescript, Rails, and DevOps.
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
        <Col md={1}>
          <a href="https://www.grouparoo.com" target="_blank">
            <Image
              height={logoSize}
              width={logoSize}
              src="/images/logos/grouparoo.png"
            />
          </a>
        </Col>
        <Col md={1} />
        <Col md={1}>
          <a href="https://www.actionhero.com" target="_blank">
            <Image
              height={logoSize}
              width={logoSize}
              src="/images/logos/actionhero.png"
            />
          </a>
        </Col>
        <Col md={1} />
        <Col md={1}>
          <a href="https://www.taskrabbit.com" target="_blank">
            <Image
              height={logoSize}
              width={logoSize}
              src="/images/logos/taskrabbit.png"
            />
          </a>
        </Col>
        <Col md={1} />
        <Col md={1}>
          <a href="https://www.airbus.com" target="_blank">
            <Image
              height={logoSize}
              width={logoSize * 1.3}
              src="/images/logos/airbus.png"
            />
          </a>
        </Col>
        <Col md={1} />
        <Col md={1}>
          <a href="https://www.modcloth.com" target="_blank">
            <Image
              height={logoSize}
              width={logoSize}
              src="/images/logos/modcloth.jpg"
            />
          </a>
        </Col>
        <Col md={1} />
        <Col md={1}>
          <a href="https://www.disney.com" target="_blank">
            <Image
              height={logoSize}
              width={logoSize}
              src="/images/logos/disney.png"
            />
          </a>
        </Col>
      </Row>
    </>
  );
}

export default ResumePage;
