import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/header";
import Footer from "../components/footer";
import "../scss/site.scss";

export default function SITE(props) {
  const { Component } = props;

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        <meta name="viewport" content="width=device-width" />

        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <script src="/js/googleAnalytics.js" />
      </Head>

      <Header />

      <Container>
        <Row>
          <Col md={12}>
            <br />
            <br />
            <br />
            <br />
            <Component {...props} />
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}
