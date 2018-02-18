import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./AuthPage.css";
import { getIsAuthorized } from "../../reducers/auth";
import { authorize } from "../../actions/auth";

export class AuthPage extends Component {
  handleKeyDown = event => {
    const keyCodeEnter = 13;
    if (event.keyCode === keyCodeEnter) {
      this.props.boundAuthorize(this.loginInput.value);
    }
  };

  render() {
    if (this.props.isAuthorized) {
      return <Redirect to="/user/me" />;
    }

    return (
      <div className="login-form">
        <p>
          Получить токен нужно на своей странице github, перейдите по{" "}
          <a href="https://github.com/settings/tokens">адресу</a> и создать себе
          токен. Запишите куда нибудь токен, так как после создания доступ к
          нему будет только один раз.
        </p>
        <input
          className="login-form__input"
          placeholder="auth_token"
          ref={input => (this.loginInput = input)}
          onKeyDown={this.handleKeyDown}
        />
        <p>После ввода нажать Enter</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state)
});

const mapDispathToProps = {
  boundAuthorize: authorize
};

export default connect(mapStateToProps, mapDispathToProps)(AuthPage);
