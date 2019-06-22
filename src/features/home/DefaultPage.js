import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import TodoList from './TodoList';

const { Header, Content, Sider } = Layout;

export class DefaultPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toolbarTitle: 'Todo',
      collapsed: this.getDefaultCollaspsed(),
    };
  }

  getDefaultCollaspsed = () => {
    // if (window.innerWidth < 1024) {
    //   return true;
    // }
    // return false;
    return true;
  };

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  };

  capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  handleMenuChange = ({ item, key, keyPath }) => {
    this.setState({
      toolbarTitle: this.capitalizeFirstLetter(key),
    });
  };

  render() {
    const { toolbarTitle } = this.state;
    return (
      <Layout>
        <Header className="header" style={{ paddingLeft: 20 }} >
          <div className="logo" />
          <h1 style={{ color: 'white', fontSize: 20 }}>
            <Icon type="schedule" onClick={this.toggle} />
            {' To Do List'}
          </h1>
        </Header>
        <Layout style={{ height: '92vh' }} >
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <Menu
              mode="inline"
              theme="dark"
              defaultSelectedKeys={['todo']}
              style={{ height: '100%', borderRight: 0 }}
              onClick={this.handleMenuChange}
            >
              <Menu.Item key="todo">
                <Icon type="calendar" />
                <span>To Do</span>
              </Menu.Item>
              <Menu.Item key="completed">
                <Icon type="check-circle" />
                <span>Completed</span>
              </Menu.Item>
              <Menu.Item key="deleted">
                <Icon type="delete" />
                <span>Deleted</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px', overflowX: 'auto' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>{toolbarTitle}</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, overflowX: 'auto' }}>
              <TodoList
                type={toolbarTitle.toLowerCase()}
                addMode={toolbarTitle === 'Todo'}
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
