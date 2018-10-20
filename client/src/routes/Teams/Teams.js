import React, { Component } from 'react'
import { Table, Button, Row, Col } from 'antd'
import VoteModal from './VoteModal'

export default class Teams extends Component {
  state = { teams: [], showPoints: false }

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

  showPoints = () => {
    this.setState({ showPoints: true })
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
        title: 'Points',
        dataIndex: 'totalPoints',
        key: 'totalPoints',
        render: text =>
          this.state.showPoints ? (text && text.toNumber()) || 0 : null,
      },
      {
        title: 'Vote',
        key: 'vote',
        render: (text, record) => <VoteModal {...record} {...this.props} />,
      },
    ]

    return (
      <div>
        <Row>
          <Col span={18}>
            <h2>Teams</h2>
          </Col>
          <Col span={6}>
            {!this.state.showPoints ? (
              <Button
                type="primary"
                style={{ float: 'right' }}
                onClick={this.showPoints}
              >
                Reveal Points
              </Button>
            ) : null}
          </Col>
        </Row>

        <Table dataSource={this.state.teams} columns={columns} />
      </div>
    )
  }
}
