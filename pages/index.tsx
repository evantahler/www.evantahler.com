import { Fragment } from "react";
import { Row, Col, Badge, Button, Card } from "react-bootstrap";
import { Blog } from "../lib/blog";
import ContactCards from "../components/contactCards";
import SEO from "../components/seo";
import Image from "next/image";
import Link from "next/link";

import talks from "./../data/talks.json";

function BoldWords({ text }) {
  return <span style={{ color: "var(--bs-primary)" }}>{text}</span>;
}

function IndexPage({ posts }: { posts: Blog.PostData[] }) {
  return (
    <>
      <SEO title="Evan Tahler" path="/" />

      <Card>
        <Card.Body>
          <Row>
            <Col md={3} style={{ textAlign: "center" }}>
              <Image width={203} height={376} src="/images/bitmoji.png" />
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

                  <br />

                  <p>
                    I am the CTO and co-founder of{" "}
                    <a href="https://www.grouparoo.com" target="_blank">
                      Grouparoo
                    </a>{" "}
                    & Creator of{" "}
                    <a href="https://www.actionherojs.com" target="_blank">
                      Actionherojs
                    </a>
                  </p>
                </Col>
              </Row>

              <div style={{ padding: 30 }} />

              <ContactCards />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <br />

      <Row>
        <Col md={6}>
          <h2>
            Featured Posts{" "}
            <Button size="sm" variant="info" href="/blog">
              See all Posts
            </Button>
          </h2>

          <br />

          {posts.map((post) => {
            return (
              <Fragment key={post.meta.title}>
                <Card>
                  <Link href={`/blog/post/${post.slug}`}>
                    <a>
                      <Card.Img
                        style={{ maxHeight: 400 }}
                        variant="top"
                        src={post.meta.image}
                      />
                    </a>
                  </Link>

                  <Card.Body>
                    <Card.Title>
                      <Link href={`/blog/post/${post.slug}`}>
                        <a>{post.meta.title}</a>
                      </Link>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {new Date(post.meta.date).toDateString()}
                    </Card.Subtitle>
                    <Card.Text>
                      {post.meta.description}
                      <br />
                      <br />
                      <small>
                        {post.meta.tags.map((tag) => (
                          <Fragment key={`blog-${tag}`}>
                            <Link href={`/blog/tag/${tag}`}>
                              <a>
                                <Badge
                                  key={`${post.meta.title}|${tag}`}
                                  bg="info"
                                >
                                  {tag}
                                </Badge>
                              </a>
                            </Link>{" "}
                          </Fragment>
                        ))}
                      </small>
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

          <br />

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

export async function getStaticProps() {
  const { posts, total, page, tag, count } = await Blog.getAll({
    featured: true,
  });

  return {
    props: {
      total,
      page,
      tag,
      count,
      posts,
    },
  };
}
