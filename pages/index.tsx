import { Row, Col, Card } from "react-bootstrap";
import { Blog } from "../lib/blog";
import ContactCards from "../components/ContactCards";
import SEO from "../components/Seo";
import Image from "next/image";
import Link from "next/link";
import { talks } from "../data/talks";
import { BlogPostCard } from "../components/BlogPostCard";
import { SpeakingEngagementCard } from "../components/SpeakingEngagementCard";

import bitmogi from "../public/images/bitmoji/5.png";

function BoldWords({ text }) {
  return <span style={{ color: "var(--bs-warning)" }}>{text}</span>;
}

function IndexPage({
  featuredPosts,
  latestPosts,
}: {
  featuredPosts: Blog.PostData[];
  latestPosts: Blog.PostData[];
}) {
  return (
    <>
      <SEO title="Evan Tahler" path="/" />

      <Card>
        <Card.Body style={{ paddingLeft: 0 }}>
          <Row>
            <Col md={3}>
              <Image src={bitmogi} alt="evan icon" priority={true} />
            </Col>

            <Col md={9} style={{ paddingLeft: "2rem" }}>
              <Row>
                <Col md={12}>
                  <h1>Hi, I'm Evan!</h1>
                  <br />
                  <h4>
                    I use my <BoldWords text="Software Engineering" />,{" "}
                    <BoldWords text="Product Management" />, and{" "}
                    <BoldWords text="Leadership" /> skills to build teams that
                    create world-class digital products.
                  </h4>

                  <br />

                  <p>
                    I lead engineering organizations at{" "}
                    <a href="https://www.airbyte.com" target="_blank">
                      Airbyte,
                    </a>{" "}
                    advise <Link href="resume">startups</Link>, and and am the
                    creator of{" "}
                    <a href="https://www.actionherojs.com" target="_blank">
                      Actionherojs.
                    </a>
                  </p>
                </Col>
              </Row>

              <div style={{ padding: 30 }} />

              <ContactCards variant="info" />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <br />

      <h2>
        Latest <Link href="/blog">Blog</Link> Posts
      </h2>

      <Row>
        <Col md={6}>
          {latestPosts[0] && <BlogPostCard post={latestPosts[0]} />}
        </Col>
        <Col md={6}>
          {latestPosts[1] && <BlogPostCard post={latestPosts[1]} />}
        </Col>
      </Row>

      <br />

      <Row>
        <Col md={6}>
          <h2>
            Featured <Link href="/blog">Blog</Link> Posts
          </h2>

          <br />

          {featuredPosts.map((post, idx) => (
            <BlogPostCard key={`featured-post-${idx}`} post={post} />
          ))}
        </Col>

        <Col md={6}>
          <h2>
            Featured <Link href="/speaking">Talks</Link>
          </h2>

          <br />

          {talks.slice(0, 3).map((talk, idx) => (
            <SpeakingEngagementCard key={`talk-${idx}`} talk={talk} />
          ))}
        </Col>
      </Row>
    </>
  );
}

export default IndexPage;

export async function getStaticProps() {
  const { posts: featuredPosts } = await Blog.getAll({
    featured: true,
  });

  const { posts: latestPosts } = await Blog.getAll({
    count: 2,
  });

  return {
    props: { featuredPosts, latestPosts },
  };
}
