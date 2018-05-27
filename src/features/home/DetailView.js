import React, { Component } from 'react';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import ReactMarkdown from 'react-markdown';
import 'brace/theme/github';

export default class DetailView extends Component {
  static propTypes = {
    detail: PropTypes.string.isRequired,
    handleDetailChange: PropTypes.func.isRequired,
    saveDetailChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
  }

  enableModify = () => {
    this.setState({
      editMode: true,
    });
  };

  saveModification = () => {
    const { saveDetailChange } = this.props;
    if (saveDetailChange) {
      saveDetailChange();
    }
    this.cancleModify();
  };

  cancleModify = () => {
    this.setState({
      editMode: false,
    });
  };

  render() {
    const { detail } = this.props;
    const { editMode } = this.state;
    return (
      <div className="detail-grid" >
        <div>
          {!editMode &&
          // <pre className="home-detail-view" >{detail}</pre>
          <ReactMarkdown className="home-detail-view" source={detail} />
          }
          {editMode &&
          <AceEditor
            mode="markdown"
            theme="github"
            name="detail"
            style={{ maxHeight: '40vh', width: '60vw', height: '40vh', maxWidth: '60vw' }}
            fontSize={14}
            showPrintMargin={false}
            showGutter={false}
            highlightActiveLine={false}
            value={detail}
            onChange={this.props.handleDetailChange}
            setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: false,
            tabSize: 2,
            }}
          />
          }
        </div>
        <div>
          {!editMode &&
          <div className="detail-button" >
            <Button icon="edit" onClick={this.enableModify} >Modify</Button>
          </div>
          }
          {editMode &&
          <div>
            <div className="detail-button" >
              <Button icon="save" onClick={this.saveModification} >Save</Button>
            </div>
            <div className="detail-button" >
              <Button icon="logout" onClick={this.cancleModify} >Exit</Button>
            </div>
          </div>
          }
        </div>
      </div>
    );
  }
}
