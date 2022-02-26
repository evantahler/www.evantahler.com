// import { URL } from "url";
import Link from "next/link";
import { Fragment } from "react";
import { Badge } from "react-bootstrap";
import { Blog } from "../lib/blog";

export namespace BlogComponents {
  export function displayTags({ meta }: { meta: Blog.PostMeta }) {
    if (!meta.tags) return null;

    return (
      <>
        <small>
          {meta.tags.sort().map((tag, idx) => {
            return (
              <Fragment key={`tag-${idx}`}>
                <Link href={`/blog/tag/${tag}`}>
                  <a>
                    <Badge bg="info">{tag}</Badge>
                  </a>
                </Link>
                &nbsp;
              </Fragment>
            );
          })}
        </small>{" "}
        <br />
      </>
    );
  }

  export function displayCanonical({
    meta,
    short,
  }: {
    meta: Blog.PostMeta;
    short: boolean;
  }) {
    if (!meta.canonical) return null;

    const parsed = new URL(meta.canonical);
    const host = parsed.hostname;

    return (
      <span className="text-info">
        Originally posted at{" "}
        <Link href={meta.canonical}>
          <a target="_blank">{short ? host : meta.canonical}</a>
        </Link>
      </span>
    );
  }
}
