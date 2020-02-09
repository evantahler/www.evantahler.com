import React, { useState, useEffect } from "react";
import { Row, Col, Alert, Card, Badge, Spinner } from "react-bootstrap";
import Page from "./../components/templates/page";
import JumboImage from "./../components/jumboImage";
import featuredPosts from "./../data/featuredPosts.json";

const title = "Evan Tahler: Writing";

function stripHtml(html) {
  const temporalDivElement = document.createElement("div");
  temporalDivElement.innerHTML = html;
  return temporalDivElement.textContent || temporalDivElement.innerText || " ";
}

function WritingPage() {
  const [data, setData] = useState({ posts: [] });
  const feedUrl =
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@evantahler";

  useEffect(() => {
    async function fetchBlogPosts() {
      const data = await fetch(feedUrl).then(response => response.json()); //eslint-disable-line
      const posts = data.items.filter(
        item => item.thumbnail.indexOf("_/stat?") < 0
      );
      setData({ posts });
    }

    fetchBlogPosts();
  }, []);

  return (
    <Page title={title}>
      <>
        <h1>Writing</h1>
        <hr />

        <JumboImage src="/static/images/writing.jpg" />

        <p>
          I blog at Medium under the name{" "}
          <a href="https://medium.com/@evantahler">@evantahler</a>.
        </p>
        <Alert variant="info">
          <a href="https://medium.com/@evantahler">See all Posts</a>
        </Alert>

        <h2>Featured Writing</h2>
        <Row>
          {featuredPosts.map(post => {
            return (
              <Col md={4} key={post.guid}>
                <Card>
                  <Card.Img
                    style={{ maxHeight: 300 }}
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
                        {post.categories.map(category => (
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
              </Col>
            );
          })}
        </Row>

        <br />
        <hr />
        <h2>Latest Posts</h2>
        <Row>
          {data.posts.length > 0 ? (
            data.posts.map(post => {
              return (
                <Col md={4} key={post.guid}>
                  <Card>
                    <Card.Img
                      style={{ maxHeight: 300 }}
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
                        {post.pubDate.split(" ")[0]}
                      </Card.Subtitle>
                      <Card.Text>
                        {stripHtml(post.description.substring(0, 500))}...
                        <br />
                        <br />
                        <em>
                          Categories:{" "}
                          {post.categories.map(category => (
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
                </Col>
              );
            })
          ) : (
            <Col md={12} style={{ textAlign: "center" }}>
              <Spinner animation="grow" />
            </Col>
          )}
        </Row>
      </>
    </Page>
  );
}

export default WritingPage;
