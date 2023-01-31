import { Fragment } from "react";
import SEO from "../../components/Seo";
import { Blog } from "../../lib/blog";
import { Row, Col, Card, Image, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { PaginationHelper } from "../../components/PaginationHelper";
import { BlogComponents } from "../../components/BlogComponents";
import { TagCloud } from "react-tagcloud";
import { formattedDate } from "../../lib/formattedDate";

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
    tags,
  }: {
    posts: Blog.PostData[];
    total: number;
    page: number;
    count: number;
    tags: Record<string, number>;
  } = props;
  const router = useRouter();
  const tag = router.query?.tag?.toString();

  const wordCloudData = [];
  Object.entries(tags ?? {}).map(([tag, value]) =>
    wordCloudData.push({ value: tag, count: value })
  );

  return (
    <>
      <SEO
        title={`Evan's Blog${tag ? `: ${capitalize(tag)}` : ""}`}
        path="/blog"
      />

      <h1>
        <Link href="/blog" style={{ textDecoration: "none", color: "black" }}>
          Evan's Blog{tag ? `: ${capitalize(tag)}` : ""}
        </Link>
      </h1>
      {tag ? (
        <Button href="/blog" variant="outline-primary" size="sm">
          <a>↞ See all posts</a>
        </Button>
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
                        <Image
                          style={{ maxWidth: "100%" }}
                          rounded
                          src={post.meta.image ?? "/images/misc/announce.png"}
                        />
                      </Link>
                    </Col>

                    <Col>
                      <h4>
                        <Link
                          href={`/blog/post/${post.slug}`}
                          style={{ color: "black" }}
                        >
                          {post.meta.title}
                        </Link>
                      </h4>

                      {BlogComponents.displayTags(post)}

                      {post.meta.description ? (
                        <p>{post.meta.description}</p>
                      ) : null}

                      <em>
                        <small>
                          {formattedDate(post.meta.date)}
                          {post.meta.canonical ? (
                            <>
                              {" "}
                              -{" "}
                              {BlogComponents.displayCanonical({
                                ...post,
                                short: true,
                              })}
                            </>
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

      <h2>Tags</h2>

      <TagCloud
        tags={wordCloudData}
        minSize={8}
        maxSize={35}
        colorOptions={{ hue: "blue" }}
        onClick={(tag: { value: string }) =>
          router.push(`/blog/tag/${tag.value}`)
        }
      />

      <hr />

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
  const tags = await Blog.getAllTags(params?.tag);

  return {
    props: {
      total,
      page,
      tag,
      count,
      posts,
      tags,
    },
  };
}
