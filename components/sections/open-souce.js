import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup } from 'react-bootstrap'
import GitHub from 'github-api'

const projects = [
  { org: 'actionhero', name: 'actionhero' },
  { org: 'taskrabbit', name: 'node-resque' },
  { org: 'taskrabbit', name: 'elasticsearch-dump' },
  { org: 'actionhero', name: 'ah-sequelize-plugin' },
  { org: 'evantahler', name: 'dont-be-a-jerk' }
]

function OpenSource () {
  const [data, setData] = useState({ repositories: [] })
  const github = new GitHub()

  useEffect(() => {
    async function fetchRepositories () {
      const repositories = []
      for (const i in projects) {
        const project = projects[i]
        const repository = github.getRepo(project.org, project.name)
        const repositoryDetails = await repository.getDetails()
        repositories.push(repositoryDetails.data)
      }

      setData({ repositories })
    }

    fetchRepositories()
  }, [])

  return (
    <>
      <h2>Open Source</h2>
      <hr />

      <p>A selction of my open source contributions:</p>

      <ListGroup>
        {
          data.repositories.map((repository) => {
            return (
              <ListGroup.Item key={repository.html_url}>
                <Row>
                  <Col md={12}>
                    <h5><a href={repository.html_url}>{repository.full_name}</a></h5>
                  </Col>
                </Row>

                <Row>
                  <Col md={1}>
                    <img style={{ maxWidth: 75 }} src={repository.owner.avatar_url} />
                  </Col>
                  <Col md={11}>
                    <p>✨ {repository.stargazers_count}, 🍴 {repository.forks_count}</p>
                    <p>{repository.description}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            )
          })
        }
      </ListGroup>
    </>
  )
}

export default OpenSource
