import { Fragment } from "react";
import { Jumbotron, Row, Col, Badge, Alert, Card } from "react-bootstrap";
import Page from "../components/templates/page";
import Styles from "../components/styles/variables.json";
import BigGlyf from "../components/BigGlyf";
import Image from "next/image";

import featuredPosts from "./../data/featuredPosts.json";
import talks from "./../data/talks.json";

function BoldWords({ text }) {
  return <span style={{ color: Styles.$blue }}>{text}</span>;
}

const title = "Evan Tahler";

function IndexPage() {
  return (
    <Page title={title}>
      <>
        <Jumbotron>
          <Row>
            <Col md={3} style={{ textAlign: "center" }}>
              <Image
                width={203}
                height={376}
                src="/static/images/bitmoji.png"
              />
            </Col>

            <Col md={9}>
              <Row>
                <Col md={12}>
                  <h1>Evan Tahler</h1>
                  <br />
                  <h4>
                    I use my <BoldWords text="Product Management" />,{" "}
                    <BoldWords text="Software Engineering" />, and{" "}
                    <BoldWords text="Leadership" /> skills to build teams that
                    create world-class digital products.
                  </h4>
                </Col>
              </Row>

              <div style={{ padding: 30 }} />

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
            </Col>
          </Row>
        </Jumbotron>

        <Row>
          <Col md={6}>
            <h2>Featured Posts</h2>
            <Alert variant="info">
              <a href="/writing">See all Posts</a>
            </Alert>

            {featuredPosts.map((post) => {
              return (
                <Fragment key={post.title}>
                  <Card>
                    <Card.Img
                      style={{ maxHeight: 400 }}
                      variant="top"
                      src={post.thumbnail}
                    />
                    <Card.Body>
                      <Card.Title>
                        <a target="_new" href={post.link}>
                          {post.title}
                        </a>
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {post.date}
                      </Card.Subtitle>
                      <Card.Text>
                        {post.description}
                        <br />
                        <br />
                        <em>
                          Categories:{" "}
                          {post.categories.map((category) => (
                            <Badge
                              key={`${post.guid}-${category}`}
                              variant="secondary"
                            >
                              {" "}
                              {category}
                            </Badge>
                          ))}
                        </em>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <br />
                </Fragment>
              );
            })}
          </Col>

          <Col md={6}>
            <h2>Featured Talks</h2>
            <Alert variant="info">
              <a href="/speaking">See all Talks</a>
            </Alert>
            {talks.slice(0, 3).map((talk) => (
              <Fragment key={talk.title}>
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
              </Fragment>
            ))}
          </Col>
        </Row>
      </>
    </Page>
  );
}

export default IndexPage;
