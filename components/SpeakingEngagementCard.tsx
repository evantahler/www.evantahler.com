import { Fragment } from "react";
import { Card } from "react-bootstrap";
import talks from "../data/talks";

type Talk = (typeof talks)[number];

export const SpeakingEngagementCard = ({ talk }: { talk: Talk }) => (
  <Fragment key={talk.title}>
    <Card>
      <Card.Img variant="top" src={talk.image} />
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
