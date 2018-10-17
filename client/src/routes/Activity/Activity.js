import React, { Component } from 'react'
import { Table } from 'antd'

export default class Activity extends Component {
  state = { activity: [] }

  pushEvents = events => {
    console.log('events')
    console.log(events)

    const { activity } = this.state

    events.forEach(event => {
      activity.push({
        ...event.args,
        key: event.transactionHash,
      })
    })

    this.setState({
      activity,
    })
  }

  componentDidMount = () => {
    const { contract } = this.props

    // get past events
    contract
      .getPastEvents('TeamCreated', {
        fromBlock: 0,
        toBlock: 'latest',
      })
      .then(events => {
        this.pushEvents(events)
      })

    // listen for new events
    contract
      .TeamCreated({})
      .on('data', event => {
        this.pushEvents([event])
      })
      .on('changed', event => {
        // remove event from local database
      })
      .on('error', console.error)
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
        <h2>Activity</h2>

        <Table dataSource={this.state.activity} columns={columns} />
      </div>
    )
  }
}
