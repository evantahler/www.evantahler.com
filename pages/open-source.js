import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Spinner } from 'react-bootstrap'
import GitHub from 'github-api'
import Page from './../components/templates/page'

const title = 'Evan Tahler: Open Source'

const projects = [
  { org: 'actionhero', name: 'actionhero' },
  { org: 'taskrabbit', name: 'node-resque' },
  { org: 'taskrabbit', name: 'elasticsearch-dump' },
  { org: 'actionhero', name: 'ah-sequelize-plugin' },
  { org: 'evantahler', name: 'dont-be-a-jerk' }
]

function OpenSourcePage () {
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
    <Page title={title}>
      <>
        <h2>Open Source</h2>
        <hr />

        <p>I contribute to a number of Open Source projects because I belive it is a great way to give back to the programming community in both a professional and personal capacity... and a great way to learn about new technologies and tools!</p>
        <p>I am the creator and community manager for a number of popular Open Source projects:</p>

        <ListGroup>
          {
            data.repositories.length > 0
              ? data.repositories.map((repository) => {
                return (
                  <ListGroup.Item key={repository.html_url}>
                    <Row>
                      <Col md={12}>
                        <h5><a target='_blank' href={repository.html_url}>{repository.full_name}</a></h5>
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
              : <Row><Col md={12} style={{ textAlign: 'center' }}><Spinner animation='grow' /></Col></Row>
          }
        </ListGroup>
      </>
    </Page>
  )
}

export default OpenSourcePage
