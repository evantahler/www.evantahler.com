import { Fragment } from "react";
import { Jumbotron, Row, Col, Badge, Button, Card } from "react-bootstrap";
import ContactCards from "../components/contactCards";
import SEO from "../components/seo";
import Image from "next/image";

import featuredPosts from "./../data/featuredPosts.json";
import talks from "./../data/talks.json";

function BoldWords({ text }) {
  return <span style={{ color: "var(--bs-primary)" }}>{text}</span>;
}

function IndexPage() {
  return (
    <>
      <SEO title="Evan Tahler" path="/" />

      <Jumbotron style={{ padding: 10 }}>
        <Row>
          <Col md={3} style={{ textAlign: "center" }}>
            <Image width={203} height={376} src="/static/images/bitmoji.png" />
          </Col>

          <Col md={9}>
            <Row>
              <Col md={12}>
                <h1>Hi, I'm Evan Tahler</h1>
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

            <ContactCards />
          </Col>
        </Row>
      </Jumbotron>

      <br />

      <Row>
        <Col md={6}>
          <h2>
            Featured Posts{" "}
            <Button size="sm" variant="info" href="/writing">
              See all Posts
            </Button>
          </h2>

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
          <h2>
            Featured Talks{" "}
            <Button size="sm" variant="info" href="/speaking">
              See all Talks
            </Button>
          </h2>

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
  );
}

export default IndexPage;
