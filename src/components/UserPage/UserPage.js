import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "react-svg-spinner";
import "./UserPage.css";
import Followers from "../Followers/Followers";
import { fetchUserRequest, fetchTokenOwnerRequest } from "../../actions/users";
import { getData, getIsFetched, getIsFetching } from "../../reducers/users";

export class UserPage extends Component {
  componentDidMount() {
    const { match: { params: { name } } } = this.props;

    if (name) {
      this.props.fetchUserRequest(name);
    } else {
      this.props.fetchTokenOwnerRequest();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { name } } } = this.props;
    const { match: { params: { name: nextName } } } = nextProps;

    if (name !== nextName) {
      this.props.fetchUserRequest(nextName);
    }
  }

  render() {
    const { user, isFetched, isFetching } = this.props;

    if (isFetching) {
      const style = {
        textAlign: "center",
        paddingTop: "200px"
      };
      return (
        <div style={style}>
          <Spinner size="64px" color="lightgreen" gap={5} />
        </div>
      );
    }

    if (!isFetched && !user) {
      return <p className="error">Данные о пользователе не получены.</p>;
    }

    return (
      <div className="user-card">
        <div className="user-card__header">
          <div className="user-card__avatar">
            <img src={user.avatar_url} alt="Aватар пользователя" />
          </div>
          <div className="user-card__info">
            <span className="user-card__login">{user.login}</span>
            <span className="user-card__followers">
              Followers: {user.followers}
            </span>
            <span className="user-card__public-repos">
              Публичные репозитории: {user.public_repos}
            </span>
          </div>
        </div>
        <Followers login={user.login} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetched: getIsFetched(state),
  isFetching: getIsFetching(state),
  user: getData(state)
});

const mapDispatchToProps = {
  fetchUserRequest,
  fetchTokenOwnerRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
