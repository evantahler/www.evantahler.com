import SEO from "../../components/Seo";
import { Blog } from "../../lib/blog";
import Link from "next/link";
import { Table } from "react-bootstrap";

export default function TagsPage(props) {
  const { tags, tagValues } = props;

  return (
    <>
      <SEO title={`Evan's Blog Tags`} path="/blog" />

      <h1>
        <Link href="/blog" style={{ textDecoration: "none", color: "black" }}>
          Evan's Blog Tags
        </Link>
      </h1>

      <p>
        <Link href="/blog">See all posts</Link>
      </p>

      <hr />

      <p>Articles by Tag: </p>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Tag</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr key={`tag-${tag}`}>
              <td>
                <Link href={`/blog/tag/${tag}`}>{tag}</Link>
              </td>
              <td>{tagValues[tag]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export async function getStaticProps(params) {
  const { posts } = await Blog.getAll({
    count: 99999999,
  });

  const tagValues: { [tag: string]: number } = {};
  for (const post of posts) {
    for (const tag of post.meta.tags) {
      if (!tagValues[tag]) tagValues[tag] = 0;
      tagValues[tag]++;
    }
  }

  const tags = Object.keys(tagValues).sort((a, b) => {
    return tagValues[b] - tagValues[a];
  });

  return {
    props: { tags, tagValues },
  };
}
