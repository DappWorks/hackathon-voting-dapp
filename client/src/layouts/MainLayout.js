import React, { Component } from 'react'
import { Layout, Menu } from 'antd'

const { Header, Content, Footer } = Layout

export default class MainLayout extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <img
            src="/images/dappworks-logo.png"
            alt="DappWorks"
            style={{
              width: 120,
              float: 'left',
            }}
          />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Teams</Menu.Item>
            <Menu.Item key="2">Vote</Menu.Item>
            <Menu.Item key="3">Sponsors</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280, margin: '16px 0' }}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          DappWorks Hackathon Voting
        </Footer>
      </Layout>
    )
  }
}
