import { Fragment } from "react";
import SEO from "../../components/seo";
import { Blog } from "../../lib/blog";
import { Row, Col, Card, Image } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { PaginationHelper } from "../../components/paginationHelper";
import { BlogComponents } from "../../components/blog";

function capitalize(tag: string) {
  const words = tag.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
}

export default function BlogIndex(props) {
  const {
    posts,
    total,
    page,
    count,
  }: { posts: Blog.PostData[]; total: number; page: number; count: number } =
    props;
  const router = useRouter();
  const tag = router.query?.tag?.toString();

  return (
    <>
      <SEO
        title={`Evan's Blog${tag ? `: ${capitalize(tag)}` : ""}`}
        path="/blog"
      />

      <h1>
        <Link href="/blog">
          <a style={{ textDecoration: "none", color: "black" }}>
            Evan's Blog{tag ? `: ${capitalize(tag)}` : ""}
          </a>
        </Link>
      </h1>
      {tag ? (
        <p>
          <Link href="/blog">
            <a>See all posts</a>
          </Link>
        </p>
      ) : null}
      <hr />

      {(posts || [])
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
                    <Col md={3}>
                      <Link href={`/blog/post/${post.slug}`}>
                        <a>
                          <Image
                            style={{ maxWidth: "100%" }}
                            rounded
                            src={post.meta.image ?? "/images/misc/announce.png"}
                          />
                        </a>
                      </Link>
                    </Col>

                    <Col>
                      <h4>
                        <Link href={`/blog/post/${post.slug}`}>
                          <a style={{ color: "black" }}>{post.meta.title}</a>
                        </Link>
                      </h4>

                      {BlogComponents.displayTags(post)}

                      {post.meta.description ? (
                        <p>{post.meta.description}</p>
                      ) : null}

                      <em>
                        <small>
                          {new Date(post.meta.date).toDateString()}
                          {post.meta.canonical ? (
                            <> - {BlogComponents.displayCanonical(post)}</>
                          ) : null}
                        </small>
                      </em>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <br />
            </Fragment>
          );
        })}

      <br />

      <PaginationHelper
        baseUrl={tag && tag !== "" ? `/blog/tag/${tag}` : `/blog/page`}
        total={total}
        limit={count}
        offset={count * (page - 1)}
      />
    </>
  );
}

export async function getStaticProps({ params }) {
  const { posts, total, page, tag, count } = await Blog.getAll({
    page: params?.page,
    tag: params?.tag,
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
