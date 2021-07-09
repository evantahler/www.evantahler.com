import { Fragment } from "react";
import { Row, Col, Badge, Card } from "react-bootstrap";
import Link from "next/link";
import SEO from "../../components/seo";
import ReactMarkdown from "react-markdown";
import { Blog } from "../../lib/blog";
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
    meta: { title: string; date: string; tags: string[]; image: string };
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
                Posted @ {new Date(pageProps.meta.date).toLocaleDateString()}
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
                        &nbsp; <Badge variant="info">{tag}</Badge>
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
          <ReactMarkdown
            // @ts-ignore
            components={components}
          >
            {pageProps.markdown}
          </ReactMarkdown>
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
  const { slug, meta, markdown } = await Blog.geBySlug(params.slug);

  return {
    props: { slug, meta, markdown },
  };
}

export async function getStaticPaths() {
  const slugs = await Blog.getAll();

  return {
    paths: slugs.map((slug) => {
      return { params: { slug } };
    }),
    fallback: false,
  };
}
