import React from "react";
import { Row, Col } from "react-bootstrap";
import JumboImage from "../components/JumboImage";
import Image from "next/image";
import SEO from "../components/Seo";

const logoSize = 100;

function ResumePage() {
  return (
    <>
      <SEO title="Evan Tahler: Resume" path="/resume" />

      <h1>Resume</h1>
      <hr />

      <Row>
        <Col md={3}>
          <JumboImage src="/images/resume-3.jpg" />
        </Col>
        <Col>
          {" "}
          <p>
            Evan Tahler is the Head of Engineering at{" "}
            <a href="https://www.arcade.dev?utm_source=evan_test&utm_medium=fake&urm_campaign=evan_test_1">
              Arcade.dev
            </a>
            , building the foundation for secure and scalable agentic
            tools.{" "}
          </p>
          <p>
            Prior to Arcade, Evan was the Director of Engineering of Sync
            Foundations at Airbyte, where he built and led the teams that
            focused on high-volume data movement and AI-pipelines. Evan was the
            CTO and co-founder of Grouparoo, the open-source reverse-ETL
            company, which was acquired by Airbyte.
          </p>
          <p>
            Evan's expertise lies in building the technical side of digital
            products, and growing the teams required to do so. He's helped
            companies like{" "}
            <a target="_new" href="https://airbyte.com">
              Airbyte
            </a>
            ,{" "}
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
            launch new global digital initiatives, and has co-founded 3
            startups. He is named on multiple patents focusing on authentication
            and digital entertainment. Evan is an open-source innovator, and
            frequent speaker at software development conferences focusing on AI,
            Product Management, Data Engineering, Node.JS, Typescript and
            DevOps.
          </p>
          <p>
            Evan holds a Masters in Entertainment Technology and BS in
            Mechanical Engineering from{" "}
            <a
              target="_new"
              href="https://www.cmu.edu/homepage/creativity/2014/fall/the-greater-good.shtml"
            >
              Carnegie Mellon University
            </a>
            .
          </p>
          <br />
          <Row>
            <Col style={{ textAlign: "center" }}>
              <a href="https://airbyte.com" target="_blank">
                <Image
                  alt="airbyte logo"
                  height={logoSize}
                  width={logoSize}
                  src="/images/logos/airbyte.png"
                />
              </a>
            </Col>
            <Col style={{ textAlign: "center" }}>
              <a href="https://www.grouparoo.com" target="_blank">
                <Image
                  alt="grouparoo logo"
                  height={logoSize}
                  width={logoSize}
                  src="/images/logos/grouparoo.png"
                />
              </a>
            </Col>
            <Col style={{ textAlign: "center" }}>
              <a href="https://www.actionhero.com" target="_blank">
                <Image
                  alt="actionhero logo"
                  height={logoSize}
                  width={logoSize}
                  src="/images/logos/actionhero.png"
                />
              </a>
            </Col>
            <Col style={{ textAlign: "center" }}>
              <a href="https://www.taskrabbit.com" target="_blank">
                <Image
                  alt="taskrabbit logo"
                  height={logoSize}
                  width={logoSize}
                  src="/images/logos/taskrabbit.png"
                />
              </a>
            </Col>
          </Row>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <a href="https://www.airbus.com" target="_blank">
                <Image
                  alt="airbus logo"
                  height={logoSize}
                  width={logoSize * 1.2}
                  style={{ padding: 15 }}
                  src="/images/logos/airbus.png"
                />
              </a>
            </Col>
            <Col style={{ textAlign: "center" }}>
              <a href="https://www.modcloth.com" target="_blank">
                <Image
                  alt="modcloth logo"
                  height={logoSize}
                  width={logoSize}
                  src="/images/logos/modcloth.jpg"
                />
              </a>
            </Col>
            <Col style={{ textAlign: "center" }}>
              <a href="https://www.disney.com" target="_blank">
                <Image
                  alt="disney logo"
                  height={logoSize}
                  width={logoSize}
                  src="/images/logos/disney.png"
                />
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default ResumePage;
