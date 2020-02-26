import React from "react";
import API from "../API";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class LoginForm extends React.Component {
  handleSubmit = e => {
    API.submitLogin(e, {
      email: this.login_email.value,
      password: this.login_password.value
    }).then(() => {
      if (cookies.get("username")) this.props.login();
    });
    e.target.elements.email.value = "";
    e.target.elements.password.value = "";
    e.target.elements.email.focus();
  };

  render() {
    return (
      <div className="login-form-container">
        <h1>로그인하기</h1>

        <form onSubmit={this.handleSubmit} className="login-form">
          <div className="login-form_email">
            <input
              name="email"
              placeholder="Email"
              ref={ref => (this.login_email = ref)}
              required
              autoFocus
            />
          </div>
          <div className="login-form_password">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              ref={ref => (this.login_password = ref)}
            />
          </div>

          <button className="main-big-btn" type="submit">
            로그인하기
          </button>
        </form>

        <button
          className="main-big-btn bg-yellow"
          onClick={this.props.toggleForm}
        >
          회원가입 할래?
        </button>
      </div>
    );
  }
}

export default LoginForm;
