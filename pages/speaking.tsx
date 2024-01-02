import { Fragment } from "react";
import { Row, Col, Card } from "react-bootstrap";
import JumboImage from "../components/JumboImage";
import SEO from "../components/Seo";
import talks from "./../data/talks.json";

const title = "Evan Tahler: Speaking";

function SpeakingPage() {
  return (
    <>
      <SEO title="Evan Tahler: Speaking" path="/speaking" />

      <h1>Speaking</h1>
      <hr />

      <JumboImage src="/images/speaking-2.jpg" />

      <p>
        I've given a number of technical talks, focusing on Node.js, Ruby, and
        DevOps.
      </p>
      <h2>Featured Talks</h2>

      <Row>
        {talks.map((talk) => (
          <Col md={6} key={talk.title}>
            <Card>
              <Card.Img variant="top" src={talk.image} />
              <Card.Body>
                <Card.Title>{talk.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {talk.date}
                </Card.Subtitle>
                <Card.Text>
                  <em>for {talk.where}</em>
                  <br />
                  <br />
                  {talk.description}
                  <br />
                  {talk.links.map((l) => (
                    <Fragment key={`${talk.title}-${l.title}`}>
                      <br />*{" "}
                      <a target="_new" href={l.url}>
                        {l.title}
                      </a>
                    </Fragment>
                  ))}
                </Card.Text>
              </Card.Body>
            </Card>
            <br />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default SpeakingPage;
