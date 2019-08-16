import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Card from './../card'
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

      <Row>
        {
          data.repositories.map((repository) => {
            return <Col md={6} key={repository.url}>
              <Card header={repository.name} title={<a href={repository.html_url}>{repository.full_name}</a>} text={
                <>
                  <p>✨ {repository.stargazers_count}, 🍴 {repository.forks_count}</p>
                  <p><img style={{ maxWidth: 75 }} src={repository.owner.avatar_url} /></p>
                  <p>{repository.description}</p>
                </>
              } />
            </Col>
          })
        }
      </Row>
    </>
  )
}

export default OpenSource
