import React, { Component } from "react";
import propTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import Fragment from "render-fragment";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.user.name.trim().split(" ")[0];

    // Skill List
    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            {isEmpty(profile.bio) ? (
              <Fragment />
            ) : (
              <Fragment>
                <h3 className="text-center text-info">
                  {firstName}
                  's Bio
                </h3>
                <p className="lead">
                  <span>{profile.bio}</span>
                </p>
                <hr />
              </Fragment>
            )}
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ProfileAbout.propTypes = {
  profile: propTypes.object.isRequired
};
export default ProfileAbout;
