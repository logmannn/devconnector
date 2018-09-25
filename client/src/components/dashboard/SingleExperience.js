import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import Fragment from "render-fragment";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { withRouter } from "react-router-dom";
import {
  updateExperience,
  getCurrentProfile
} from "../../actions/profileActions";
import isFalseOrEmpty from "../../validation/is-false-or-empty";
import PropTypes from "prop-types";

class SingleExperience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: "",
      description: "",
      errors: {},
      disabled: false,
      editMode: false
    };
  }

  componentDidMount() {
    this.setState({
      company: this.props.exp.company,
      title: this.props.exp.title,
      location: this.props.exp.location,
      from: this.props.exp.from,
      to: this.props.exp.to,
      current: this.props.exp.current,
      description: this.props.exp.description
    });
  }

  onDeleteClick = id => {
    this.props.onDeleteClick(id);
  };

  onEditClick = id => {
    this.setState({
      editMode: !this.state.editMode
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = e => {
    this.setState({
      current: !this.state.current
    });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  onUpdate = id => {
    const { exp, updateExperience } = this.props;

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    updateExperience(expData, exp._id);
  };

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.errors).length === 0) {
      this.setState({
        editMode: false
      });
    } else {
      this.setState({
        editMode: true
      });
    }
  }

  render() {
    const { exp, errors } = this.props;
    const { disabled, editMode } = this.state;

    return (
      <form onSubmit={this.onSubmit} className="evenly-space">
        <div className="space center">
          {!editMode ? (
            this.state.company
          ) : (
            <TextFieldGroup
              placeholder="* Company"
              name="company"
              value={this.state.company}
              onChange={this.onChange}
              error={errors.company}
            />
          )}
        </div>
        <div className="space center">
          {!editMode ? (
            this.state.title
          ) : (
            <TextFieldGroup
              placeholder="* Job Title"
              name="title"
              value={this.state.title}
              onChange={this.onChange}
              error={errors.title}
            />
          )}
        </div>
        <div className="space center">
          {!editMode ? (
            <Fragment>
              {moment.utc(this.state.from).format("MM/DD/YYYY")} -{" "}
              {this.state.to
                ? moment.utc(this.state.to).format("MM/DD/YYYY")
                : " Current"}
            </Fragment>
          ) : (
            <Fragment>
              <h6>From Date</h6>
              <TextFieldGroup
                name="from"
                type="date"
                placeholder="Date"
                value={moment.utc(this.state.from).format("YYYY-MM-DD")}
                onChange={this.onChange}
                error={errors.from}
              />
              <h6>To Date</h6>
              <TextFieldGroup
                name="to"
                type="date"
                placeholder="Date"
                value={moment.utc(this.state.to).format("YYYY-MM-DD")}
                onChange={this.onChange}
                error={errors.to}
                disabled={this.state.current ? "current" : ""}
              />
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={this.state.current}
                  checked={this.state.current}
                  onChange={this.onCheck}
                  id="current"
                />
                <label className="form-check-label" onClick={this.onCheck}>
                  Current Job
                </label>
              </div>
            </Fragment>
          )}
        </div>
        <div className="space center">
          {!editMode ? (
            this.state.location
          ) : (
            <TextFieldGroup
              placeholder="Location"
              name="location"
              value={this.state.location}
              onChange={this.onChange}
              error={errors.location}
            />
          )}
        </div>
        <div className="space form-box center">
          {!editMode ? (
            this.state.description
          ) : (
            <TextAreaFieldGroup
              placeholder="Job Description"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              error={errors.description}
              info="Tell us about the position"
            />
          )}
        </div>
        <div className="space center">
          {!editMode ? (
            <Fragment>
              <button
                className="btn btn-info"
                onClick={this.onEditClick.bind(this, exp._id)}
              >
                Edit
              </button>{" "}
              <button
                className="btn btn-danger"
                onClick={this.onDeleteClick.bind(this, exp._id)}
              >
                Delete
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <button
                className="btn btn-info"
                onClick={this.onUpdate.bind(this, exp._id)}
              >
                Submit
              </button>
              <button
                className="btn btn-danger"
                onClick={this.onEditClick.bind(this, exp._id)}
              >
                Cancel
              </button>
            </Fragment>
          )}
        </div>
      </form>
    );
  }
}

SingleExperience.proptypes = {
  updateExperience: PropTypes.func.isRequired,
  experience: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  experience: state.exp,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateExperience, getCurrentProfile }
)(withRouter(SingleExperience));
