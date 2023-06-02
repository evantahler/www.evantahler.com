import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";
import "../scss/site.scss";

export default function SITE({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Header />

      <Container>
        <Row>
          <Col md={12}>
            <br />
            <br />
            <br />
            <br />
            <Component {...pageProps} />
          </Col>
        </Row>
      </Container>

      <Footer />

      <Analytics />
    </>
  );
}
