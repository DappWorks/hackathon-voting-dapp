import React, { Component } from 'react'
import { Table } from 'antd'

export default class Teams extends Component {
  state = { teams: [] }

  componentDidMount = async () => {
    const teams = []

    const { contract } = this.props

    const totalTeams = await contract.totalTeams()

    console.log('totalTeams', totalTeams)

    for (let i = 1; i <= totalTeams; i++) {
      const team = await contract.getTeam(i)

      teams.push({ ...team, key: team.submitter })
    }

    console.log('teams', teams)

    this.setState({ teams })
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Github',
        dataIndex: 'github',
        key: 'github',
      },
      {
        title: 'Submitter',
        dataIndex: 'submitter',
        key: 'submitter',
      },
    ]

    return (
      <div>
        <h2>Teams</h2>

        <Table dataSource={this.state.teams} columns={columns} />
      </div>
    )
  }
}
