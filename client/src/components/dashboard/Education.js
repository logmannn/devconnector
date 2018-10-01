import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { deleteEducation } from "../../actions/profileActions";
import SingleEducation from "./SingleEducation";

class Education extends Component {
  onDeleteClick = id => {
    this.props.deleteEducation(id);
  };

  onEditClick = id => {
    this.props.editEducation(id);
  };

  render() {
    console.log(this.props.education);

    const education = this.props.education
      .sort(function(a, b) {
        return +new Date(a.from) - +new Date(b.from);
      })
      .reverse()
      .map(edu => (
        <SingleEducation
          edu={edu}
          key={edu._id}
          onDeleteClick={this.onDeleteClick}
        />
      ));

    return (
      <div>
        <h4 className="mb-5 center-mobile">Education Credentials</h4>
        <div className="evenly-space bold hide-when-tablet">
          <div className="space center">School</div>
          <div className="space center">Degree</div>
          <div className="space center">Years</div>
          <div className="space center">Location</div>
          <div className="space center">Field of Study</div>
          <div className="space center">Description</div>
        </div>
        {education}
      </div>
    );
  }
}

deleteEducation.propTypes = {
  deleteEducation: propTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
