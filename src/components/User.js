import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import Repos from "./Repos";

const User = ({ user, match, getUser, getUserRepos, loading, repos }) => {
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    //eslint-disable-next-line
  }, []);

  const {
    login,
    bio,
    location,
    html_url,
    name,
    following,
    followers,
    avatar_url,
    public_repos,
    public_gists,
    company,
    hireable,
    blog,
  } = user;

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to="/" className="btn btn-line">
        Back to Search
      </Link>
      Hireable:{" "}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            alt={login}
            className="round-img"
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>{location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Visit Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: </strong> {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: </strong> {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website: </strong> {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers : {followers}</div>
        <div className="badge badge-danger">Following : {following}</div>
        <div className="badge badge-warning">Public Repos : {public_repos}</div>
        <div className="badge badge-success">Public Gists : {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  getUserRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
};

export default User;
