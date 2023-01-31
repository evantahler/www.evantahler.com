import { Fragment } from "react";
import { Badge, Card } from "react-bootstrap";
import { Blog } from "../lib/blog";
import Link from "next/link";
import { formattedDate } from "../lib/formattedDate";

export const BlogPostCard = ({ post }: { post: Blog.PostData }) => (
  <Fragment key={post.meta.title}>
    <Card>
      <Link href={`/blog/post/${post.slug}`}>
        <Card.Img
          style={{ maxHeight: 400 }}
          variant="top"
          src={post.meta.image}
        />
      </Link>

      <Card.Body>
        <Card.Title>
          <Link href={`/blog/post/${post.slug}`}>{post.meta.title}</Link>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {formattedDate(post.meta.date)}
        </Card.Subtitle>
        <Card.Text>
          {post.meta.description}
          <br />
          <br />
          <small>
            {post.meta.tags.map((tag) => (
              <Fragment key={`blog-${tag}`}>
                <Link href={`/blog/tag/${tag}`}>
                  <Badge key={`${post.meta.title}|${tag}`} bg="info">
                    {tag}
                  </Badge>
                </Link>{" "}
              </Fragment>
            ))}
          </small>
        </Card.Text>
      </Card.Body>
    </Card>
    <br />
  </Fragment>
);
