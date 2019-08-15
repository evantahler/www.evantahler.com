import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
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

      <Table striped condensed hover>
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Description</th>
            <th>Stars</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {
            data.repositories.map((repository) => {
              return <tr key={repository.url}>
                <td><img style={{ maxWidth: 75 }} src={repository.owner.avatar_url} /></td>
                <td><strong>{repository.name}</strong></td>
                <td>{repository.description}</td>
                <td>{repository.stargazers_count}</td>
                <td><a href={repository.url}>{repository.full_name}</a></td>
              </tr>
            })
          }
        </tbody>
      </Table>
    </>
  )
}

export default OpenSource
