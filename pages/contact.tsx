import React from "react";
import ContactCards from "../components/contactCards";
import JumboImage from "../components/jumboImage";
import Calendly from "../components/calendly";
import SEO from "../components/seo";
import { Alert } from "react-bootstrap";

const title = "Evan Tahler: Contact";

function ContactPage() {
  return (
    <>
      <SEO title="Evan Tahler: Contact" path="/contact" />

      <h1>Contact</h1>
      <hr />

      <JumboImage src="/images/contact.jpg" />

      <h2 style={{ textAlign: "center" }}>Let's chat!</h2>

      <ContactCards variant="info" />

      <br />

      <Alert variant="light">
        <p>
          If you are looking to hire me on a contractor basis, please reach out
          via{" "}
          <a href="https://www.delicioushat.com" target="_new">
            Delicious Hat
          </a>
          , my Web Technology Development and Consulting firm.
        </p>
        <p>
          If you are looking for help with ActionHero, please{" "}
          <a href="https://www.actionherojs.com/community" target="_new">
            join the ActionHero community
          </a>
        </p>
      </Alert>

      <hr />
      <p>Or schedule a chat with me!</p>
      <Calendly />
    </>
  );
}

export default ContactPage;
