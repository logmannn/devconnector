import React, { Component } from "react";
import moment from "moment";
import styled from "styled-components";
import { connect } from "react-redux";
import Fragment from "render-fragment";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { withRouter } from "react-router-dom";
import {
  updateEducation,
  getCurrentProfile
} from "../../actions/profileActions";
import PropTypes from "prop-types";

const Form = styled.form`
  margin-bottom: 1rem;
  margin-top: 1rem;
  border-top: 1px solid #6c757d;
  padding-top: 1rem;
`;

const EducationDetails = styled.div`
  margin-bottom: 1rem;
`;

class SingleEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      newlocation: "",
      degree: "",
      from: "",
      to: "",
      current: "",
      description: "",
      fieldofstudy: "",
      errors: {},
      disabled: false,
      editMode: false,
      schoolEdit: "",
      newlocationEdit: "",
      degreeEdit: "",
      fromEdit: "",
      toEdit: "",
      currentEdit: "",
      descriptionEdit: "",
      fieldofstudyEdit: "",
      id: 0
    };
  }

  componentDidMount() {
    this.setState({
      school: this.props.edu.school,
      newlocation: this.props.edu.newlocation,
      degree: this.props.edu.degree,
      from: this.props.edu.from,
      to: this.props.edu.to,
      current: this.props.edu.current,
      description: this.props.edu.description,
      id: this.props.edu._id,
      fieldofstudy: this.props.edu.fieldofstudy
    });
  }

  onDeleteClick = id => {
    this.props.onDeleteClick(id);
  };

  onEditClick = id => {
    this.setState({
      editMode: !this.state.editMode,
      schoolEdit: this.state.school,
      newlocationEdit: this.state.newlocation,
      degreeEdit: this.state.degree,
      fromEdit: this.state.from,
      toEdit: this.state.to,
      currentEdit: this.state.current,
      descriptionEdit: this.state.description,
      fieldofstudyEdit: this.state.fieldofstudy
    });
  };
  onCancelClick = id => {
    this.setState({
      editMode: !this.state.editMode,
      school: this.state.schoolEdit,
      newlocation: this.state.newlocationEdit,
      degree: this.state.degreeEdit,
      from: this.state.fromEdit,
      to: this.state.toEdit,
      current: this.state.currentEdit,
      description: this.state.descriptionEdit,
      fieldofstudy: this.state.fieldofstudyEdit
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
    const { edu, updateEducation } = this.props;

    this.setState({
      editMode: !this.state.editMode,
      schoolEdit: this.state.school,
      newlocationEdit: this.state.newlocation,
      degreeEdit: this.state.degree,
      fromEdit: this.state.from,
      toEdit: this.state.to,
      currentEdit: this.state.current,
      descriptionEdit: this.state.description,
      fieldofstudyEdit: this.state.fieldofstudyEdit,
      errors: {}
    });

    const eduData = {
      school: this.state.school,
      newlocation: this.state.newlocation,
      degree: this.state.degree,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
      fieldofstudy: this.state.fieldofstudy,
      id: id
    };

    updateEducation(eduData, edu._id);
  };

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.errors[nextProps.edu._id] !== "undefined") {
      if (Object.keys(nextProps.errors[nextProps.edu._id]).length === 0) {
        this.setState({
          editMode: false
        });
      } else {
        this.setState({
          editMode: true
        });
        this.setState({
          errors: {
            school: nextProps.errors[nextProps.edu._id].school,
            degree: nextProps.errors[nextProps.edu._id].degree,
            newlocation: nextProps.errors[nextProps.edu._id].newlocation,
            from: nextProps.errors[nextProps.edu._id].from,
            to: nextProps.errors[nextProps.edu._id].to,
            current: nextProps.errors[nextProps.edu._id].current,
            description: nextProps.errors[nextProps.edu._id].description,
            id: nextProps.errors[nextProps.edu._id].id,
            fieldofstudy: nextProps.errors[nextProps.edu._id].fieldofstudy
          }
        });
      }
    }
  }

  render() {
    const { edu } = this.props;
    const { editMode, errors } = this.state;

    const actionButtons = (
      <div className="space center">
        {!editMode ? (
          <Fragment>
            <button
              className="btn btn-info"
              onClick={this.onEditClick.bind(this, edu._id)}
            >
              Edit
            </button>{" "}
            <button
              className="btn btn-danger"
              onClick={this.onDeleteClick.bind(this, edu._id)}
            >
              Delete
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <button
              className="btn btn-info"
              onClick={this.onUpdate.bind(this, edu._id)}
            >
              Submit
            </button>
            <button
              className="btn btn-danger"
              onClick={this.onCancelClick.bind(this, edu._id)}
            >
              Cancel
            </button>
          </Fragment>
        )}
      </div>
    );

    return (
      <Form onSubmit={this.onSubmit}>
        <EducationDetails className="evenly-space column-tablet">
          <div className="space center">
            <div className="bold show-tablet">School</div>
            {!editMode ? (
              this.state.school
            ) : (
              <TextFieldGroup
                placeholder="* School"
                name="school"
                value={this.state.school}
                onChange={this.onChange}
                error={errors.school}
              />
            )}
          </div>
          <div className="space center">
            <div className="bold show-tablet">Title</div>
            {!editMode ? (
              this.state.degree
            ) : (
              <TextFieldGroup
                placeholder="* Job Title"
                name="degree"
                value={this.state.degree}
                onChange={this.onChange}
                error={errors.degree}
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
              this.state.newlocation
            ) : (
              <TextFieldGroup
                placeholder="Location"
                name="newlocation"
                value={this.state.newlocation}
                onChange={this.onChange}
                error={errors.newlocation}
              />
            )}
          </div>
          <div className="space center">
            <div className="bold show-tablet">Field of Study</div>
            {!editMode ? (
              this.state.fieldofstudy
            ) : (
              <TextFieldGroup
                placeholder="Field of Study"
                name="fieldofstudy"
                value={this.state.fieldofstudy}
                onChange={this.onChange}
                error={errors.fieldofstudy}
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
        </EducationDetails>
        {actionButtons}
      </Form>
    );
  }
}

SingleEducation.proptypes = {
  updateEducation: PropTypes.func.isRequired,
  education: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  education: state.edu,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateEducation, getCurrentProfile }
)(withRouter(SingleEducation));
