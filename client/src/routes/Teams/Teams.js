import React, { Component } from 'react'
import { Table } from 'antd'
import VoteModal from './VoteModal'

export default class Teams extends Component {
  state = { teams: [] }

  componentDidMount = async () => {
    const teams = []

    const { contract } = this.props

    const totalTeams = await contract.totalTeams()

    console.log('totalTeams', totalTeams.toNumber())

    // TODO the more efficient way to do this is to create a getTeams function that returns arrays of data
    // you can't return an array of structs, but you can return multiple arrays with one for each field
    // and then match up the data on the client
    for (let i = 1; i <= totalTeams; i++) {
      const team = await contract.getTeam(i)

      teams.push({ ...team, key: i, id: i })
    }

    console.log('teams', teams)

    this.setState({ teams })
  }

  render() {
    const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
      },
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
      {
        title: 'Vote',
        key: 'vote',
        render: (text, record) => <VoteModal {...record} {...this.props} />,
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
