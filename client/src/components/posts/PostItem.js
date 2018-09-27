import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";
import ThumbsUp from "../../img/ThumbsUp";
import ThumbsDown from "../../img/ThumbsDown";

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

    let likeState = false;

    if (post.likes.filter(like => like.user === auth.user.id).length > 0) {
      likeState = true;
    }

    this.setState({
      likeCount: post.likes.length,
      didLike: likeState
    });
  }

  onDeleteClick(id, auth) {
    this.props.deletePost(id);
  }

  onLikeClick(id, auth, likes) {
    const { didLike } = this.state;
    // if (!likes.filter(like => like.user === auth.user.id).length > 0) {
    if (!this.state.didLike) {
      this.setState({ likeCount: this.state.likeCount + 1, didLike: true });
      this.props.addLike(id, auth);
    } else {
      this.setState({ likeCount: this.state.likeCount - 1, didLike: false });
      this.props.removeLike(id);
    }
    // }
  }

  onUnlikeClick(id, auth, likes) {
    const { didLike } = this.state;
    // if (likes.filter(like => like.user === auth.user.id).length > 0) {
    if (this.state.didLike) {
      this.setState({ likeCount: this.state.likeCount - 1, didLike: false });
      this.props.removeLike(id);
    }
    // }
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

    const didUserLike = this.state.didLike;

    let conditionalLike;

    if (didUserLike) {
      conditionalLike = true;
    } else {
      conditionalLike = false;
    }

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {/* {showActions ? ( */}
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
              {post.user === auth.user.id ? (
                <button
                  onClick={this.onDeleteClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </span>
            {/* } */}
          </div>
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
