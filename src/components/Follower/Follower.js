import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "./Follower.css";

export class Follower extends PureComponent {
  render() {
    const { follower } = this.props;
    return (
      <div className="follower">
        <img
          className="follower__avatar"
          src={follower.avatar_url}
          alt={follower.login}
        />
        <div className="follower__info">
          <Link to={`/user/${follower.login}`}>{follower.login}</Link>
        </div>
      </div>
    );
  }
}

export default Follower;
