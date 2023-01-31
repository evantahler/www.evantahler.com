import Link from "next/link";
import { Button, Card } from "react-bootstrap";

export const BlogSidebar = () => {
  return (
    <Card>
      <Card.Img variant="top" src="/images/bitmoji/4.png" />
      <Card.Body>
        <Card.Title>
          Hi, I'm <Link href="/">Evan</Link>
        </Card.Title>
        <Card.Text>
          I write about Technology, Software, and Startups. I use my Product
          Management, Software Engineering, and Leadership skills to build teams
          that create world-class digital products.
        </Card.Text>
        <Button variant="outline-primary" href="/contact">
          Get in touch
        </Button>
      </Card.Body>
    </Card>
  );
};
