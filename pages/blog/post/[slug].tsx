import { Fragment } from "react";
import { Row, Col, Badge, Card, Button } from "react-bootstrap";
import Link from "next/link";
import SEO from "../../../components/seo";
import ReactMarkdown from "react-markdown";
import { Blog } from "../../../lib/blog";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism";

const components = {
  img({ node, src, ...props }) {
    return (
      <Card>
        <Card.Img variant="top" src={src} {...props}></Card.Img>
      </Card>
    );
  },
  p: (props) => {
    return props.children[0]?.type?.name === "img" ? (
      <>
        <div {...props} />
        <br />
      </>
    ) : (
      <p {...props} />
    );
  },
  a: (props) => (
    <a target={props.href.includes("http") ? "_blank" : undefined} {...props} />
  ),
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    let matchedLanguage = match ? match[1] : undefined;
    if (matchedLanguage === "js") matchedLanguage = "javascript";
    if (matchedLanguage === "ts") matchedLanguage = "typescript";

    return !inline && match ? (
      <SyntaxHighlighter
        style={nord}
        showLineNumbers={true}
        language={matchedLanguage}
        PreTag="div"
        children={String(children).replace(/\n$/, "")}
        {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

export default function BlogPage({
  pageProps,
}: {
  pageProps: {
    slug: string;
    meta: Blog.PostMeta;
    markdown: string;
  };
}) {
  return (
    <>
      <SEO
        title={pageProps.meta.title}
        path={`/blog/${pageProps.slug}`}
        image={pageProps.meta.image}
      />

      <Row>
        <Col md={12}>
          <h1>{pageProps.meta.title}</h1>

          <p>
            <em>
              <small>
                Posted {new Date(pageProps.meta.date).toDateString()}
              </small>
            </em>

            {pageProps.meta.tags ? (
              <>
                <br />
                <small>
                  Tagged:{" "}
                  {pageProps.meta.tags.sort().map((tag, idx) => {
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
                </small>
              </>
            ) : (
              ""
            )}
          </p>

          <hr />
        </Col>
      </Row>

      <Row>
        <Col md={9}>
          <div id="markdown">
            <ReactMarkdown
              // @ts-ignore
              components={components}
              rehypePlugins={[rehypeRaw]}
            >
              {pageProps.markdown}
            </ReactMarkdown>
          </div>
        </Col>

        <Col>
          <Card>
            <Card.Img variant="top" src="/images/misc/wave.png" />
            <Card.Body>
              <Card.Title>
                Hi, I'm{" "}
                <Link href="/">
                  <a>Evan</a>
                </Link>
              </Card.Title>
              <Card.Text>
                I write about Technology, Software, and Startups. I use my
                Product Management, Software Engineering, and Leadership skills
                to build teams that create world-class digital products.
              </Card.Text>
              <Button variant="outline-primary" href="/contact">
                Get in touch
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <hr />

          <Link href="/blog">
            <a>🚀 Back to Evan's Blog</a>
          </Link>
        </Col>
      </Row>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { slug, meta, markdown } = await Blog.getBySlug(params.slug);

  return {
    props: { slug, meta, markdown },
  };
}

export async function getStaticPaths() {
  const { posts } = await Blog.getAll({ count: 9999 });
  const slugs = posts.map((p) => p.slug);

  return {
    paths: slugs.map((slug) => {
      return { params: { slug } };
    }),
    fallback: false,
  };
}
