import { Row, Col, Badge, Card, Button } from "react-bootstrap";
import Link from "next/link";
import SEO from "../../../components/seo";
import ReactMarkdown from "react-markdown";
import { Blog } from "../../../lib/blog";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { BlogComponents } from "../../../components/blog";

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
  a: (props) => {
    return (
      <a
        target={props.href.includes("http") ? "_blank" : undefined}
        {...props}
      />
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
  slug,
  meta,
  markdown,
}: {
  slug: string;
  meta: Blog.PostMeta;
  markdown: string;
}) {
  return (
    <>
      <SEO
        title={meta.title}
        path={`/blog/${slug}`}
        image={meta.image}
        canonical={meta.canonical}
      />

      <Row>
        <Col md={12}>
          <h1>{meta.title}</h1>

          <p>
            {BlogComponents.displayTags({ meta })}
            <em>
              <small>
                {new Date(meta.date).toDateString()}
                {meta.canonical ? (
                  <>
                    {" "}
                    - {BlogComponents.displayCanonical({ meta, short: false })}
                  </>
                ) : null}
              </small>
            </em>
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
              {markdown}
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

      <br />

      <Row>
        <Col>
          <Button href="/blog" variant="outline-primary">
            <a>↞ See all posts</a>
          </Button>
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
