import React, { Component } from "react";
import moment from "moment";
import styled from "styled-components";
import { connect } from "react-redux";
import Fragment from "render-fragment";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { withRouter } from "react-router-dom";
import {
  updateExperience,
  getCurrentProfile
} from "../../actions/profileActions";
import propTypes from "prop-types";

const Form = styled.form`
  margin-bottom: 1rem;
  margin-top: 1rem;
  border-top: 1px solid #6c757d;
  padding-top: 1rem;
`;

const ExperienceDetails = styled.div`
  margin-bottom: 1rem;
`;

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
      editMode: false,
      companyEdit: "",
      titleEdit: "",
      locationEdit: "",
      fromEdit: "",
      toEdit: "",
      currentEdit: "",
      descriptionEdit: "",
      id: 0
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
      description: this.props.exp.description,
      id: this.props.exp._id
    });
  }

  onDeleteClick = id => {
    this.props.onDeleteClick(id);
  };

  onEditClick = id => {
    this.setState({
      editMode: !this.state.editMode,
      companyEdit: this.state.company,
      titleEdit: this.state.title,
      locationEdit: this.state.location,
      fromEdit: this.state.from,
      toEdit: this.state.to,
      currentEdit: this.state.current,
      descriptionEdit: this.state.description
    });
  };
  onCancelClick = id => {
    this.setState({
      editMode: !this.state.editMode,
      company: this.state.companyEdit,
      title: this.state.titleEdit,
      location: this.state.locationEdit,
      from: this.state.fromEdit,
      to: this.state.toEdit,
      current: this.state.currentEdit,
      description: this.state.descriptionEdit
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

    this.setState({
      editMode: !this.state.editMode,
      companyEdit: this.state.company,
      titleEdit: this.state.title,
      locationEdit: this.state.location,
      fromEdit: this.state.from,
      toEdit: this.state.to,
      currentEdit: this.state.current,
      descriptionEdit: this.state.description,
      errors: {}
    });

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
      id: id
    };

    updateExperience(expData, exp._id);
  };

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.errors[nextProps.exp._id] !== "undefined") {
      if (Object.keys(nextProps.errors[nextProps.exp._id]).length === 0) {
        this.setState({
          editMode: false
        });
      } else {
        this.setState({
          editMode: true
        });
        this.setState({
          errors: {
            company: nextProps.errors[nextProps.exp._id].company,
            title: nextProps.errors[nextProps.exp._id].title,
            location: nextProps.errors[nextProps.exp._id].location,
            from: nextProps.errors[nextProps.exp._id].from,
            to: nextProps.errors[nextProps.exp._id].to,
            current: nextProps.errors[nextProps.exp._id].current,
            description: nextProps.errors[nextProps.exp._id].description,
            id: nextProps.errors[nextProps.exp._id].id
          }
        });
      }
    }
  }

  render() {
    const { exp } = this.props;
    const { editMode, errors } = this.state;

    const actionButtons = (
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
              onClick={this.onCancelClick.bind(this, exp._id)}
            >
              Cancel
            </button>
          </Fragment>
        )}
      </div>
    );

    return (
      <Form onSubmit={this.onSubmit}>
        <ExperienceDetails className="evenly-space column-tablet">
          <div className="space center">
            <div className="bold show-tablet">Company</div>
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
            <div className="bold show-tablet">Title</div>
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
            <div className="bold show-tablet">Years</div>
            {!editMode ? (
              <Fragment>
                {moment.utc(this.state.from).format("MM/DD/YYYY")} -{" "}
                {this.state.to && !this.state.current
                  ? moment.utc(this.state.to).format("MM/DD/YYYY")
                  : " Current"}
              </Fragment>
            ) : (
              <Fragment>
                <TextFieldGroup
                  name="from"
                  type="date"
                  placeholder="Date"
                  value={moment.utc(this.state.from).format("YYYY-MM-DD")}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To</h6>
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
            <div className="bold show-tablet">Location</div>
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
            <div className="bold show-tablet">Description</div>
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
          <div />
        </ExperienceDetails>
        {actionButtons}
      </Form>
    );
  }
}

SingleExperience.proptypes = {
  updateExperience: propTypes.func.isRequired,
  experience: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  experience: state.exp,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateExperience, getCurrentProfile }
)(withRouter(SingleExperience));
