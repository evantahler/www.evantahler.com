import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, Spinner, Alert, Button } from "react-bootstrap";
import Image from "next/image";
import GitHub from "github-api";
import JumboImage from "../components/jumboImage";
import SEO from "../components/seo";

const projects = [
  { org: "airbytehq", name: "airbyte" },
  { org: "grouparoo", name: "grouparoo" },
  { org: "actionhero", name: "actionhero" },
  { org: "actionhero", name: "node-resque" },
  { org: "actionhero", name: "ah-sequelize-plugin" },
  { org: "taskrabbit", name: "elasticsearch-dump" },
  { org: "taskrabbit", name: "empujar" },
  { org: "evantahler", name: "dont-be-a-jerk" },
];

function OpenSourcePage() {
  const [data, setData] = useState({ repositories: [] });
  const github = new GitHub();

  useEffect(() => {
    async function fetchRepositories() {
      const repositories = [];
      for (const i in projects) {
        const project = projects[i];
        const repository = github.getRepo(project.org, project.name);
        const repositoryDetails = await repository.getDetails();
        repositories.push(repositoryDetails.data);
      }

      setData({ repositories });
    }

    fetchRepositories();
  }, []);

  return (
    <>
      <SEO title="Evan Tahler: Open Source Software" path="/open-source" />

      <h1>Open Source</h1>
      <hr />

      <JumboImage src="/images/open-source.jpg" />

      <Alert variant="light">
        <p>
          <strong>You can now soponsor my work via Github Sponsorships!</strong>
        </p>
        <p>
          Working on these project is far more than just{" "}
          <a href="https://github.com/actionhero/actionhero/commits/master">
            writing code
          </a>
          . It includes{" "}
          <a href="https://docs.actionherojs.com/">documentation</a>,{" "}
          <a href="https://www.actionherojs.com/community">
            community management
          </a>
          ,{" "}
          <a href="https://blog.evantahler.com/tagged/actionherojs">
            education
          </a>
          , and <a href="https://www.actionherojs.com/solutions">support</a>.
          Help me continue to provide the open-source coomunity with these
          tools... and of course, more features and code :D
        </p>
        <div style={{ textAlign: "center" }}>
          <p>
            <a
              href="https://github.com/users/evantahler/sponsorship"
              target="_new"
            >
              <Button variant="outline-primary">Donate Today</Button>
            </a>
          </p>
        </div>
      </Alert>

      <p>
        I contribute to a number of Open Source projects because I belive it is
        a great way to give back to the programming community in both a
        professional and personal capacity... and a great way to learn about new
        technologies and tools!
      </p>

      <p>
        I am the creator and community manager for a number of popular Open
        Source projects, some of which are highlighed below.
      </p>

      <ListGroup>
        {data.repositories.length > 0 ? (
          data.repositories.map((repository) => {
            return (
              <ListGroup.Item key={repository.html_url}>
                <Row>
                  <Col md={12}>
                    <h5>
                      <a target="_new" href={repository.html_url}>
                        {repository.full_name}
                      </a>
                    </h5>
                  </Col>
                </Row>

                <Row>
                  <Col md={1}>
                    <Image
                      alt={repository.html_url}
                      width={75}
                      height={75}
                      src={repository.owner.avatar_url}
                    />
                  </Col>
                  <Col md={11}>
                    <p>
                      ✨ {repository.stargazers_count}, 🍴{" "}
                      {repository.forks_count}
                    </p>
                    <p>{repository.description}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })
        ) : (
          <Row>
            <Col md={12} style={{ textAlign: "center" }}>
              <Spinner animation="border" />
            </Col>
          </Row>
        )}
      </ListGroup>
    </>
  );
}

export default OpenSourcePage;
