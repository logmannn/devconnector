import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ActionButtonWrapper = styled.div`
  @media screen and (max-width: 767px) {
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
  @media screen and (max-width: 480px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;

const ProfileActions = () => {
  return (
    <ActionButtonWrapper className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-info mr-1" />
        Add Education
      </Link>
    </ActionButtonWrapper>
  );
};

export default ProfileActions;
