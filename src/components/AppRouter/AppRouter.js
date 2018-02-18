import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./AppRouter.css";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AuthPage from "../AuthPage/AuthPage";
import UserPage from "../UserPage/UserPage";
import { getIsAuthorized } from "../../reducers/auth";
import { getNetworkError } from "../../reducers/network";
import { logout } from "../../actions/auth";

export class AppRouter extends Component {
  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const { networkError, isAuthorized } = this.props;

    if (networkError) {
      return <p className="error">Ошибка: {networkError}</p>;
    }

    return (
      <div>
        {isAuthorized && (
          <div className="page-header">
            <button className="logout-button" onClick={this.handleLogout}>
              Logout
            </button>
          </div>
        )}
        <Switch>
          <PrivateRoute path="/user/me" exact component={UserPage} />
          <PrivateRoute path="/user/:name" component={UserPage} />
          <Route path="/login" exact component={AuthPage} />
          <Redirect to="/user/me" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state),
  networkError: getNetworkError(state)
});

const mapDispathToProps = {
  logout
};

export default withRouter(
  connect(mapStateToProps, mapDispathToProps)(AppRouter)
);
