import { Fragment } from "react";
import SEO from "../../components/seo";
import { Blog } from "../../lib/blog";
import { Row, Col, Card, CardDeck, Badge, Image } from "react-bootstrap";
import Link from "next/link";

interface PostData {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  image: string;
}

export default function BlogIndex({ pageProps }) {
  const postData: PostData[] = pageProps.postData;

  return (
    <>
      <SEO title="Evan's Blog" path="/blog" />

      <h1>Evan's Blog</h1>
      <hr />

      <CardDeck>
        {postData
          .sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          })
          .map((post, idx) => {
            return (
              <Card key={`post-${idx}`}>
                <Card.Img variant="top" src={post.image} />
                <Card.Body>
                  <Row>
                    {/* <Col md={2}>
                      <Link href={`/blog/${post.slug}`}>
                        <a>
                          <Image
                            style={{ maxWidth: "100%" }}
                            rounded
                            src={post.image}
                          />
                        </a>
                      </Link>
                    </Col> */}
                    <Col>
                      <h4>
                        <Link href={`/blog/${post.slug}`}>
                          <a style={{ color: "black" }}>{post.title}</a>
                        </Link>
                      </h4>

                      <em>
                        <small>
                          {new Date(post.date).toLocaleDateString()}
                        </small>
                      </em>

                      <p>
                        {post.tags ? (
                          <>
                            <small>
                              {post.tags.sort().map((tag, idx) => {
                                return (
                                  <Fragment key={`tag-${idx}`}>
                                    <Badge variant="info">{tag}</Badge>&nbsp;
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
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            );
          })}
      </CardDeck>
    </>
  );
}

export async function getServerSideProps() {
  const postData = [];
  const postSlugs = await Blog.getAll();
  for (const slug of postSlugs) {
    const { meta } = await Blog.geBySlug(slug);
    postData.push({ slug, ...meta });
  }

  return { props: { postData } };
}
