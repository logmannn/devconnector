import React, { Component } from "react";
import { connect } from "react-redux";
import Fragment from "render-fragment";
import AuthFieldGroup from "../common/AuthFieldGroup";
import { resetPassword } from "../../actions/authActions";
import propTypes from "prop-types";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordChange: "",
      newPasswordChange: "",
      confirmNewPasswordChange: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    // console.log(this.props);
    // console.log(this.state);

    const resetData = {
      // id: this.auth.user.id,
      password: this.state.passwordChange,
      newPassword: this.state.newPasswordChange,
      confirmNewPassword: this.state.confirmNewPasswordChange
    };

    this.props.resetPassword(resetData);
  };

  render() {
    const { errors } = this.props;
    return (
      <Fragment>
        <h4 className="mb-5 center-mobile">Change Your Password</h4>
        <form onSubmit={this.onSubmit}>
          <AuthFieldGroup
            placeholder="Current Password"
            name="passwordChange"
            icon=""
            type="password"
            value={this.state.passwordChange}
            onChange={this.onChange}
            error={errors.password}
          />

          <AuthFieldGroup
            placeholder="New Password"
            name="newPasswordChange"
            icon=""
            type="password"
            value={this.state.newPasswordChange}
            onChange={this.onChange}
            error={errors.newPasswordChange}
          />

          <AuthFieldGroup
            placeholder="Confirm New Password"
            name="confirmNewPasswordChange"
            icon=""
            type="password"
            value={this.state.confirmNewPasswordChange}
            onChange={this.onChange}
            error={errors.confirmNewPasswordChange}
          />
          <input
            type="submit"
            value="Submit"
            className="btn btn-info btn-block mt-4"
          />
        </form>
      </Fragment>
    );
  }
}

ChangePassword.propTypes = {
  resetPassword: propTypes.func.isRequired,
  profile: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
  profile: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { resetPassword }
)(ChangePassword);
