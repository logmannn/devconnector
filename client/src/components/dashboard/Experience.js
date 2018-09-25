import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { deleteExperience } from "../../actions/profileActions";
import SingleExperience from "./SingleExperience";

class Experience extends Component {
  onDeleteClick = id => {
    this.props.deleteExperience(id);
  };

  onEditClick = id => {
    this.props.editExperience(id);
  };

  render() {
    const experience = this.props.experience
      .sort(function(a, b) {
        return +new Date(a.from) - +new Date(b.from);
      })
      .reverse()
      .map(exp => (
        <SingleExperience
          exp={exp}
          key={exp._id}
          onDeleteClick={this.onDeleteClick}
        />
      ));

    return (
      <div>
        <h4 className="mb-5">Experience Credentials</h4>
        <div className="evenly-space bold">
          <div className="space center">Company</div>
          <div className="space center">Title</div>
          <div className="space center">Years</div>
          <div className="space center">Location</div>
          <div className="space center">Description</div>
          <div className="space center"> </div>
        </div>
        {experience}
      </div>
    );
  }
}

deleteExperience.propTypes = {
  deleteExperience: propTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
