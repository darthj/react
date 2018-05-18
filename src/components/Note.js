import React, {Component} from 'react';
import '../css/Note.css';

class Note extends Component {
  constructor() {
    super();
  }
  componentWillMount() {
    this.state = {
      title: this.props.title,
      body: this.props.body,
      editMode: false
    }
  }

  handleEdit() {
    this.setState({
      editMode: true
    });
  }

   handleSave() {
    this.props.firebaseDBRef.child(this.props.id).set({
      title: this.refs.titleContent.value,
      body: this.refs.bodyContent.value
    });
    this.setState({
      title: this.refs.titleContent.value,
      body: this.refs.bodyContent.value,
      editMode: false
    });
  }


  handleDelete() {
    this.props.deleteHandler(this.props.id);
  }
    
  render() {
    let titleElement, bodyElement,buttonArea;
    if (this.state.editMode) {
      titleElement = <textarea ref="titleContent" className="title-textarea" defaultValue={this.state.title}></textarea>;
      bodyElement = <textarea ref="bodyContent" className="body-textarea" defaultValue={this.state.body}></textarea>;
      buttonArea = <div><button className="btn btn-primary" onClick={this.handleSave.bind(this)}>Save</button></div>;
    } else {
      titleElement = <h5>{this.state.title}</h5>;
      bodyElement = <p>{this.state.body}</p>;
      buttonArea = <div><button className="btn btn-info" onClick={this.handleEdit.bind(this)}>Edit</button><button className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</button></div>;
    }

    return (
      <div className="col-sm-6">
        <div className="card card-view">
          <div className="card-body">
            {titleElement}
            {bodyElement}
            {buttonArea}
          </div>
        </div>
      </div>
    );
  }
}

export default Note;
