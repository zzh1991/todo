import React, { Component } from 'react';
import { Button, Table, Modal, Select, Input, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import DetailView from './DetailView';
import * as actions from './redux/actions';
import { selectData, saveData, updateData } from './DbOperation';

const Option = Select.Option;

export class CommonListContainer extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    addMode: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      description: '',
      detail: '',
      status: '',
      dueDate: null,
      addStatus: false,
      id: null,
      createTime: null,
    };
  }

  componentDidMount() {
    this.fetchTodoList(this.props.type);
  }

  componentWillReceiveProps(nextProps) {
    const { type } = nextProps;
    if (type !== this.props.type) {
      this.fetchTodoList(type);
    }
  }

  fetchTodoList = (type) => {
    selectData(type).then((res) => {
      this.props.actions.getTodoList(res);
    });
  };

  handleAdd = () => {
    this.setState({
      addStatus: true,
      visible: true,
      description: '',
      detail: '',
      status: '',
      dueDate: null,
      id: null,
    });
  };

  handleOk = () => {
    const { id, description, dueDate, detail, status, addStatus, createTime } = this.state;
    const { type } = this.props;
    let data = {
      description,
      updateTime: Date.now(),
      detail,
      status,
      createTime,
    };
    if (dueDate !== null && dueDate !== undefined) {
      data = {
        ...data,
        dueDate: dueDate.valueOf(),
        createTime: createTime || Date.now(),
      };
    }
    if (!addStatus) {
      data = {
        ...data,
        id,
        createTime: createTime || Date.now(),
      };
      updateData(data).then((res) => {
        this.props.actions.updateToDo(res);
      }).then(() => this.fetchTodoList(type));
    } else {
      saveData(data).then((res) => {
        this.props.actions.addToDo(res);
      }).then(() => this.fetchTodoList(type));
    }

    this.setState({
      visible: false,
      addStatus: false,
    });
  }
  handleCancel = () => {
    this.setState({
      visible: false,
      addStatus: false,
    });
  }

  handleDueDateChange = (dueDate) => {
    this.setState({
      dueDate,
    });
  };

  handleStatueChange = (status) => {
    this.setState({
      status,
    });
  };

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleDetailChange = (detail) => {
    this.setState({
      detail,
    });
  };

  handleExpandRow = (expanded, record) => {
    if (expanded) {
      this.setState({
        id: record.id,
        detail: record.detail,
        description: record.description,
        status: record.status,
        dueDate: record.dueDate,
        createTime: record.createTime,
      });
    }
  };

  saveDetailChange = () => {
    if (!this.state.addStatus) {
      const { id, description, dueDate, detail, status, createTime } = this.state;
      const { type } = this.props;
      const data = {
        id,
        detail,
        description,
        updateTime: Date.now(),
        status,
        dueDate,
        createTime,
      };
      updateData(data).then((res) => {
        this.props.actions.updateToDo(res);
      }).then(() => this.fetchTodoList(type));
    }
  };

  renderToggleContent = () =>
    <DetailView detail={this.state.detail} handleDetailChange={this.handleDetailChange} saveDetailChange={this.saveDetailChange} />;

  render() {
    const { addStatus } = this.state;
    const columns = [
      { title: 'Description',
        dataIndex: 'description',
        key: 'description',
        className: 'table-column',
        sorter: (a, b) => a.description.length - b.description.length,
      },
      { title: 'Create Time',
        dataIndex: 'createTime',
        className: 'table-column',
        render: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
        key: 'createTime',
        sorter: (a, b) => a.createTime - b.createTime,
      },
      { title: 'Update Time',
        dataIndex: 'updateTime',
        className: 'table-column',
        render: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
        key: 'updateTime',
        sorter: (a, b) => a.updateTime - b.updateTime,
      },
      { title: 'Due Date',
        dataIndex: 'dueDate',
        className: 'table-column',
        render: (text) => {
          if (text === null || text === undefined) {
            return '';
          }
          return moment(text).format('YYYY-MM-DD HH:mm:ss');
        },
        key: 'dueDate',
        sorter: (a, b) => a.dueDate - b.dueDate,
      },
      { title: 'Status', dataIndex: 'status', key: 'status', className: 'table-column', },
      { title: 'Action',
        className: 'table-column',
        key: 'action',
        render: text => (
          <Button
            icon="edit"
            size="small"
            type="primary"
            onClick={() => {
              let dueDate = null;
              if (text.dueDate !== null && text.dueDate !== undefined) {
                dueDate = moment(text.dueDate);
              }
              this.setState({
                visible: true,
                description: text.description || '',
                detail: text.detail || '',
                status: text.status || '',
                id: text.id || null,
                dueDate,
                createTime: text.createTime || Date.now(),
              });
            }}
          >
          Edit
          </Button>
        )
      },
    ];

    return (
      <div className="home-todo-list">
        {this.props.addMode &&
        <div style={{ marginBottom: 8 }}>
          <Button type="primary" icon="plus" onClick={this.handleAdd}>Add</Button>
        </div>
        }
        <Table
          columns={columns}
          expandedRowRender={this.renderToggleContent}
          dataSource={this.props.home.todoList || []}
          rowKey={record => record.id}
          onExpand={(expanded, record) => { this.handleExpandRow(expanded, record); }}
        />
        <Modal
          title={!addStatus ? 'Edit' : 'Add'}
          width="75vw"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            <div className="edit-view" >
              {'Description:  '}
              <Input
                style={{ width: '20vw' }}
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              />
            </div>
            <div className="edit-view" >
              {'Status:  '}
              <Select
                style={{ width: 120, marginLeft: 32 }}
                value={this.state.status}
                onChange={this.handleStatueChange}
              >
                <Option value="todo">todo</Option>
                <Option value="completed">completed</Option>
                <Option value="deleted">deleted</Option>
              </Select>
            </div>
            <div className="edit-view" >
              {'Due Date:  '}
              <DatePicker
                showTime
                style={{ marginLeft: 14 }}
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="Select Time"
                onChange={this.handleDueDateChange}
                value={this.state.dueDate}
                allowClear
              />
            </div>
            <br />
            <h4>Detail</h4>
            <DetailView detail={this.state.detail} handleDetailChange={this.handleDetailChange} />
          </div>
        </Modal>
      </div>
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
)(CommonListContainer);
