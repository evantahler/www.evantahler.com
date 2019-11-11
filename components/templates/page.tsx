import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import Header from "../header";

function PageTemplate({ title, children }) {
  const year = new Date().getFullYear();

  return (
    <>
      <Head>
        <title>{title}</title>

        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/static/icons/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/static/icons/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/static/icons/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/static/icons/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/static/icons/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/static/icons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/static/icons/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/static/icons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/icons/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/static/icons/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/static/icons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/icons/favicon-16x16.png"
        />

        <meta name="viewport" content="width=device-width" />
        <link
          rel="stylesheet"
          type="text/css"
          href="/static/css/bootstrap.min.css"
        />
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <script src="/static/js/googleAnalytics.js" />
      </Head>

      <Header />

      <Container>
        <Row>
          <Col md={12}>
            <br />
            <br />
            <br />
            <br />
            {children}
          </Col>
        </Row>

        <Row>
          <Col md={12} style={{ textAlign: "center", paddingTop: 100 }}>
            <p>
              <small className="text-muted">
                Copyright, Evan Tahler {year}
              </small>
            </p>
            <p>
              <small className="text-muted">
                <a
                  href="https://github.com/evantahler/www.evantahler.com"
                  target="_new"
                >
                  source for this site
                </a>
              </small>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PageTemplate;
