import { Fragment } from "react";
import { Row, Col, Badge, Card } from "react-bootstrap";
import SEO from "../../components/seo";
import ReactMarkdown from "react-markdown";
import { Blog } from "../../lib/blog";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import Image from "next/image";

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
    return !inline && match ? (
      <SyntaxHighlighter
        style={dark}
        language={match[1]}
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
    meta: { title: string; date: string; tags: string[] };
    markdown: string;
  };
}) {
  return (
    <>
      <SEO title={pageProps.meta.title} path={`/blog/${pageProps.slug}`} />

      <Row>
        <Col md={12}>
          <h1>{pageProps.meta.title}</h1>
          <p>
            <em>{new Date(pageProps.meta.date).toLocaleDateString()}</em>

            {pageProps.meta.tags
              ? pageProps.meta.tags.sort().map((tag, idx) => {
                  return (
                    <Fragment key={`tag-${idx}`}>
                      &nbsp; <Badge variant="info">{tag}</Badge>
                    </Fragment>
                  );
                })
              : ""}
          </p>

          <hr />
          <ReactMarkdown
            // @ts-ignore
            components={components}
          >
            {pageProps.markdown}
          </ReactMarkdown>
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
