import React, { Component } from "react";
import { connect } from "react-redux";
import Fragment from "render-fragment";
import TextFieldGroup from "../common/TextFieldGroup";
import { resetPassword } from "../../actions/authActions";

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
          <TextFieldGroup
            placeholder="Current Password"
            name="passwordChange"
            icon=""
            type="password"
            value={this.state.passwordChange}
            onChange={this.onChange}
            error={errors.password}
          />

          <TextFieldGroup
            placeholder="New Password"
            name="newPasswordChange"
            icon=""
            type="password"
            value={this.state.newPasswordChange}
            onChange={this.onChange}
            error={errors.newPasswordChange}
          />

          <TextFieldGroup
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

// ChangePassword.propTypes = {
//   createProfile: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { resetPassword }
)(ChangePassword);
