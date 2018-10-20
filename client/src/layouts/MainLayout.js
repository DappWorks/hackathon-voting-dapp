import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { Link } from "react-router-dom";

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
            <Menu.Item key="1"><Link to={`/`}>Teams</Link></Menu.Item>
            <Menu.Item key="2"><Link to={`/submit-team`}>Submit Team</Link></Menu.Item>
            <Menu.Item key="3"><Link to={`/sponsors`}>Sponsors</Link></Menu.Item>
            <Menu.Item key="4"><Link to={`/activity`}>Activity</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 600, margin: '16px 0' }}>
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
