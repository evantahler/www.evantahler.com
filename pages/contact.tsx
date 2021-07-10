import React from "react";
import ContactCards from "../components/contactCards";
import JumboImage from "../components/jumboImage";
import Calendly from "../components/calendly";
import SEO from "../components/seo";

const title = "Evan Tahler: Contact";

function ContactPage() {
  return (
    <>
      <SEO title="Evan Tahler: Contact" path="/contact" />

      <h1>Contact</h1>
      <hr />

      <JumboImage src="/images/contact.jpg" />

      <strong>
        <p>Let's chat!</p>
      </strong>

      <ContactCards />

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

      <hr />
      <p>Or schedule a chat with me!</p>
      <Calendly />
    </>
  );
}

export default ContactPage;
