import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";
import ThumbsUp from "../../img/ThumbsUp";
import ThumbsDown from "../../img/ThumbsDown";
import styled from "styled-components";
import Moment from "react-moment";

const CardSections = styled.div`
  width: 100%;
  display: flex;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
`;

const UserName = styled.div``;

const PostDate = styled(Moment)`
  display: block;
  color: #a9a9a9;
  font-weight: lighter;
  font-size: 0.8rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.6rem;
`;

const UserNameLink = styled(Link)`
  color: #000000;
`;

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeCount: 0,
      didLike: false
    };
  }

  componentDidMount() {
    const { post, auth } = this.props;

    if (post.likes.filter(like => like.user === auth.user.id).length > 0) {
      this.setState({
        didLike: true
      });
    }

    this.setState({
      likeCount: post.likes.length
    });
  }

  onDeleteClick(id, auth) {
    this.props.deletePost(id);
  }

  onLikeClick(id, auth, likes) {
    const { likeCount } = this.state;
    if (!this.state.didLike) {
      this.setState({
        likeCount: likeCount + 1,
        didLike: true
      });
      this.props.addLike(id, auth);
    } else {
      this.setState({
        likeCount: likeCount - 1,
        didLike: false
      });
      this.props.removeLike(id);
    }
  }

  onUnlikeClick(id, auth, likes) {
    const { didLike, likeCount } = this.state;
    if (didLike) {
      this.setState({ likeCount: likeCount - 1, didLike: false });
      this.props.removeLike(id);
    }
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      this.setState({
        didLike: true
      });
    } else {
      this.setState({
        didLike: false
      });
    }
  }

  render() {
    const { auth, post } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <CardSections className="">
            <Link to={`/profile/${post.handle}`}>
              <Avatar
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </Link>
            <UserInfo>
              <UserNameLink to={`/profile/${post.handle}`}>
                <UserName>{post.name}</UserName>
              </UserNameLink>
              <PostDate format="MM/DD/YYYY">{post.date}</PostDate>
            </UserInfo>
          </CardSections>
          <CardSections className="">
            <p className="lead">{post.text}</p>
            <span>
              <button
                onClick={this.onLikeClick.bind(
                  this,
                  post._id,
                  auth,
                  post.likes
                )}
                type="button"
                className="btn btn-light mr-1"
              >
                {this.state.didLike ? <ThumbsUp /> : <ThumbsDown />}
                <span className="badge badge-light">
                  {this.state.likeCount}
                </span>
              </button>
              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments
              </Link>
              {post.user === auth.user.id || auth.user.isAdmin ? (
                <button
                  onClick={this.onDeleteClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </span>
          </CardSections>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
