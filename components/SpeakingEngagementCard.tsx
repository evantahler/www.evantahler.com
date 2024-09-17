import { Fragment } from "react";
import { Card } from "react-bootstrap";
import Image from "next/image";
import { Talk } from "../data/talks";

export const SpeakingEngagementCard = ({ talk }: { talk: Talk }) => (
  <Fragment key={talk.title}>
    <Card>
      {/* <Card.Img variant="top"  /> */}
      <Image
        src={talk.image}
        alt={talk.title}
        style={{ width: "100%", height: "auto" }}
        className="card-img-top"
      />
      <Card.Body>
        <Card.Title>{talk.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{talk.date}</Card.Subtitle>
        <Card.Text>
          <em>for {talk.where}</em>
          <br />
          <br />
          {talk.description}
          <br />
          {talk.links.map((l) => (
            <Fragment key={`${talk.title}-${l.title}`}>
              <br />*{" "}
              <a target="_new" href={l.url}>
                {l.title}
              </a>
            </Fragment>
          ))}
        </Card.Text>
      </Card.Body>
    </Card>
    <br />
  </Fragment>
);
