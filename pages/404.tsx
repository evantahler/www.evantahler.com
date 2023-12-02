import { Blog } from "../lib/blog";
import fuzzysort from "fuzzysort";
import { Fragment, useState, useEffect } from "react";
import { Spinner, Card, Badge } from "react-bootstrap";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

interface PageType {
  href: string;
  title: string;
  tags: string;
  image?: string;
}

export default function FourOhFourPage({ pages }: { pages: PageType[] }) {
  const router = useRouter();
  const [searchTerm, setSearchTem] = useState<string>(
    router.asPath
      ?.replace(/\//g, " ")
      ?.replace(/_/g, " ")
      ?.replace(/-\w+$/, " ")
      ?.split("-")
      ?.slice(0, 3)
      ?.join("-"),
  );
  const [matches, setMatches] = useState<{ page: PageType; score: number }[]>(
    [],
  );
  const [searching, setSearching] = useState(true);

  if (!searchTerm) return <p>Loading...</p>;

  useEffect(() => {
    search();
  }, [searchTerm]);

  async function search() {
    // console.log("STARTING");
    if (!searchTerm) return;
    const results = fuzzysort.go(searchTerm, pages, {
      keys: ["title", "href", "tags"],
      limit: 10, // don't return more results than you need!
      // threshold: -10000, // don't return bad results
    });
    setMatches(
      results.map((result) => {
        return { page: result.obj, score: result.score };
      }),
    );
    setSearching(false);
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <h1>This page cannot be found</h1>

      {!searching ? (
        <>
          <p>
            Here are the most relevant pages for{" "}
            <Badge bg="info">{searchTerm}</Badge>:
          </p>
          {matches.length > 0 ? (
            matches.map(({ page, score }) => {
              return (
                <Fragment key={`page-${page.href}`}>
                  <Card>
                    <Card.Header>
                      <h4>{page.title}</h4>
                    </Card.Header>
                    <Card.Body>
                      <p>
                        <Link href={page.href}>{page.href}</Link>
                        <br />
                        <small>Match Score: {score}</small>
                      </p>
                    </Card.Body>
                  </Card>
                  <br />
                </Fragment>
              );
            })
          ) : (
            <p>No Results</p>
          )}
        </>
      ) : (
        <>
          <p>
            Loading matches for <Badge bg="info">{searchTerm}</Badge>...
          </p>
          <Spinner animation="grow" />
        </>
      )}
    </>
  );
}

export async function getStaticProps() {
  const pages: PageType[] = [
    { href: "/", title: "home", tags: "" },
    { href: "/resume", title: "resume", tags: "" },
    { href: "/speaking", title: "speaking", tags: "" },
    { href: "/blog", title: "blog", tags: "" },
    { href: "/contact", title: "contact", tags: "" },
  ];

  const { posts } = await Blog.getAll({ count: 999 });
  posts.forEach((post) => {
    pages.push({
      href: `/blog/post/${post.slug}`,
      title: post.meta.title,
      tags: post.meta.tags.join("-"),
    });
  });

  return { props: { pages } };
}
