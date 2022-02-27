import { Container, Alert, Row, Col } from "react-bootstrap";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <Alert
        variant="light"
        style={{ paddingTop: 40, marginTop: 50, marginBottom: 0 }}
      >
        <Container>
          <Row>
            <Col md={6}>
              <img src="/images/dog.png" style={{ width: 75 }} />
            </Col>
            <Col md={6} style={{ textAlign: "right" }}>
              <p>
                <small className="text-muted">
                  Copyright, Evan Tahler {year} <br />
                  <a
                    href="https://github.com/evantahler/www.evantahler.com"
                    target="_new"
                  >
                    source for this site
                  </a>
                  <br />
                  <a target="_blank" href="https://twiter.com/@evantahler">
                    @evantahler
                  </a>
                </small>
              </p>
            </Col>
          </Row>
        </Container>
      </Alert>
    </footer>
  );
}
