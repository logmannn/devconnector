import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";
import DidLike from "./DidLike";

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeCount: "",
      didLike: ""
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
    console.log(this.state);
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
                {this.state.didLike ? (
                  <div>
                    true
                    {/* <img src="https://image.flaticon.com/icons/svg/61/61012.svg" /> */}
                    {/* <i className="fas fa-thumbs-up text-info" /> */}
                    <svg
                      className="svg-inline--fa fa-thumbs-up fa-w-16 text-info"
                      aria-hidden="true"
                      data-prefix="fas"
                      data-icon="thumbs-up"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"
                      />
                    </svg>
                  </div>
                ) : (
                  <div>
                    false
                    <svg
                      className="svg-inline--fa fa-thumbs-up fa-w-16"
                      aria-hidden="true"
                      data-prefix="fas"
                      data-icon="thumbs-up"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"
                      />
                    </svg>
                  </div>
                )}
                {/* <DidLike didLike={this.state.didLike} /> */}
                <span className="badge badge-light">
                  {this.state.likeCount}
                </span>
              </button>
              <button
                onClick={this.onUnlikeClick.bind(
                  this,
                  post._id,
                  auth,
                  post.likes
                )}
                type="button"
                className="btn btn-light mr-1"
              >
                <i className="text-secondary fas fa-thumbs-down" />
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
