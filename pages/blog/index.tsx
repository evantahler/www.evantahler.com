import { Fragment } from "react";
import SEO from "../../components/seo";
import { Blog } from "../../lib/blog";
import { Row, Col, Card, Badge, Image } from "react-bootstrap";
import Link from "next/link";

interface PostData {
  slug: string;
  markdown: string;
  meta: {
    title: string;
    description?: string;
    date: string;
    tags: string[];
    image: string;
  };
}

export default function BlogIndex({ pageProps }) {
  const postData: PostData[] = pageProps.postData;

  return (
    <>
      <SEO title="Evan's Blog" path="/blog" />

      <h1>
        <Link href="/blog">
          <a style={{ textDecoration: "none", color: "black" }}>Evan's Blog</a>
        </Link>
      </h1>
      <hr />

      {postData
        .sort((a, b) => {
          return (
            new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
          );
        })
        .map((post, idx) => {
          return (
            <Fragment key={`post-${idx}`}>
              <Card>
                {/* <Card.Img variant="top" src={post.image} /> */}
                <Card.Body>
                  <Row>
                    {post.meta.image ? (
                      <Col md={3}>
                        <Link href={`/blog/${post.slug}`}>
                          <a>
                            <Image
                              style={{ maxWidth: "100%" }}
                              rounded
                              src={post.meta.image}
                            />
                          </a>
                        </Link>
                      </Col>
                    ) : null}

                    <Col>
                      <h4>
                        <Link href={`/blog/post/${post.slug}`}>
                          <a style={{ color: "black" }}>{post.meta.title}</a>
                        </Link>
                      </h4>

                      <p>
                        {post.meta.tags && post.meta.tags.length > 0 ? (
                          <>
                            <small>
                              {post.meta.tags.sort().map((tag, idx) => {
                                return (
                                  <Fragment key={`tag-${idx}`}>
                                    <Link href={`/blog/tag/${tag}`}>
                                      <a>
                                        <Badge variant="info">{tag}</Badge>
                                      </a>
                                    </Link>
                                    &nbsp;
                                  </Fragment>
                                );
                              })}
                            </small>{" "}
                            <br />
                          </>
                        ) : (
                          ""
                        )}
                      </p>

                      {post.meta.description ? (
                        <p>{post.meta.description}</p>
                      ) : null}

                      <em>
                        <small>{new Date(post.meta.date).toDateString()}</small>
                      </em>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <br />
            </Fragment>
          );
        })}
    </>
  );
}

export async function getStaticProps({ params }) {
  const page = parseInt(params?.page) || 1;
  const postData = [];

  const posts = await Blog.getAll();
  for (const post of posts) {
    let match = false;
    if (params?.tag) {
      if (post.meta.tags.includes(params.tag)) match = true;
    } else {
      match = true;
    }

    if (match) postData.push(post);
  }

  return {
    props: { postData: postData.reverse().slice(page - 1, Blog.perPage) },
  };
}
