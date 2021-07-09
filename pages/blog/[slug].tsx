import { Row, Col, Badge } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Blog } from "../../lib/blog";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import Image from "next/image";

const components = {
  Image,
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
      <Row>
        <Col md={12}>
          <h1>{pageProps.meta.title}</h1>
          <em>
            {new Date(pageProps.meta.date).toLocaleDateString()}{" "}
            {pageProps.meta.tags
              ? pageProps.meta.tags.map((tag, idx) => {
                  return (
                    <Badge variant="success" key={`tag-${idx}`}>
                      {tag}
                    </Badge>
                  );
                })
              : ""}
          </em>
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
