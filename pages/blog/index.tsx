import { Fragment } from "react";
import SEO from "../../components/seo";
import { Blog } from "../../lib/blog";
import { Row, Col, Card, CardDeck, Badge, Image } from "react-bootstrap";
import Link from "next/link";

interface PostData {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags: string[];
  image: string;
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
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
        .map((post, idx) => {
          return (
            <Card key={`post-${idx}`}>
              {/* <Card.Img variant="top" src={post.image} /> */}
              <Card.Body>
                <Row>
                  {post.image ? (
                    <Col md={3}>
                      <Link href={`/blog/${post.slug}`}>
                        <a>
                          <Image
                            style={{ maxWidth: "100%" }}
                            rounded
                            src={post.image}
                          />
                        </a>
                      </Link>
                    </Col>
                  ) : null}

                  <Col>
                    <h4>
                      <Link href={`/blog/post/${post.slug}`}>
                        <a style={{ color: "black" }}>{post.title}</a>
                      </Link>
                    </h4>

                    <p>
                      {post.tags && post.tags.length > 0 ? (
                        <>
                          <small>
                            {post.tags.sort().map((tag, idx) => {
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

                    {post.description ? <p>{post.description}</p> : null}

                    <em>
                      <small>{new Date(post.date).toLocaleDateString()}</small>
                    </em>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          );
        })}
    </>
  );
}

export async function getStaticProps({ params }) {
  const postData = [];
  const postSlugs = await Blog.getAll();
  for (const slug of postSlugs) {
    const { meta } = await Blog.geBySlug(slug);

    let match = false;
    if (params?.tag) {
      if (meta.tags.includes(params.tag)) match = true;
    } else {
      match = true;
    }

    if (match) postData.push({ slug, ...meta });
  }

  return { props: { postData } };
}
