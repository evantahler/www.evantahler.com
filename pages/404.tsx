import { Blog } from "../lib/blog";
import fuzzysort from "fuzzysort";
import { Fragment, useState, useEffect } from "react";
import { Spinner, Card, Badge } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

interface PageType {
  href: string;
  title: string;
  image?: string;
}

export default function FourOhFourPage({ pages }: { pages: PageType[] }) {
  const router = useRouter();
  const [searchTerm, setSearchTem] = useState<string>(
    router.asPath
      ?.replace(/\//g, "")
      ?.replace(/_/g, " ")
      ?.replace(/-\w+$/, "")
      ?.split("-")
      ?.slice(0, 3)
      ?.join("-")
  );
  const [matches, setMatches] = useState<{ page: PageType; score: number }[]>(
    []
  );
  const [searching, setSearching] = useState(true);

  useEffect(() => {
    search();
  }, [searchTerm]);

  async function search() {
    // console.log("STARTING");
    if (!searchTerm) return;
    const results = await fuzzysort.goAsync(searchTerm, pages, {
      keys: ["title", "href"],
      limit: 10, // don't return more results than you need!
      allowTypo: false, // if you don't care about allowing typos
      // threshold: -10000, // don't return bad results
    });
    setMatches(
      results.map((result) => {
        return { page: result.obj, score: result.score };
      })
    );
    setSearching(false);
  }

  return (
    <>
      <h1>This page cannot be found</h1>

      {!searching ? (
        <>
          <p>
            Here are the most relevant pages for{" "}
            <Badge variant="info">{searchTerm}</Badge>:
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
                        <Link href={page.href}>
                          <a>{page.href}</a>
                        </Link>
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
            Loading matches for <Badge variant="info">{searchTerm}</Badge>...
          </p>
          <Spinner animation="grow" />
        </>
      )}
    </>
  );
}

export async function getStaticProps() {
  const pages: PageType[] = [
    { href: "/", title: "home" },
    { href: "/resume", title: "resume" },
    { href: "/speaking", title: "speaking" },
    { href: "/blog", title: "blog" },
    { href: "/contact", title: "contact" },
  ];

  const { posts } = await Blog.getAll({ count: 999 });
  posts.forEach((post) => {
    pages.push({
      href: `/blog/post/${post.slug}`,
      title: post.meta.title,
    });
  });

  return { props: { pages } };
}
