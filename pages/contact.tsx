import React from "react";
import ContactCards from "../components/ContactCards";
import JumboImage from "../components/JumboImage";
import SEO from "../components/Seo";
import { Alert, Button } from "react-bootstrap";

function ContactPage() {
  return (
    <>
      <SEO title="Evan Tahler: Contact" path="/contact" />

      <h1>Contact</h1>
      <hr />

      <JumboImage src="/images/contact-2.jpg" />

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
        <p>
          Otherwise...
          <br />
          <br />
          <Button
            variant="outline-primary"
            href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ16A24TTpkRzn9hmftYCLsGXROlTohM1YCsVjklKO7CPv4H56FX00q4-4HOwH5OZvO_EaeSVD67"
            target="_blank"
          >
            schedule a chat with me!
          </Button>
        </p>
      </Alert>
    </>
  );
}

export default ContactPage;
