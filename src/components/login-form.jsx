import React from "react";
import API from "../API";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class LoginForm extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const loginData = {
      email: this.state.email,
      password: this.state.password
    };
    return (
      <div className="login-form-container">
        <h1>로그인하기</h1>

        <form
          onSubmit={e => {
            API.submitLogin(e, loginData).then(() => {
              if (cookies.get("username")) this.props.login();
            });
            e.target.elements.email.value = "";
            e.target.elements.password.value = "";
          }}
          className="login-form"
        >
          <div className="login-form_email">
            <input
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
          </div>
          <div className="login-form_password">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>

          <button className="main-big-btn" type="submit">
            로그인
          </button>
        </form>

        <button className="main-big-btn" onClick={this.props.toggleForm}>
          회원가입 할래?
        </button>
      </div>
    );
  }
}

export default LoginForm;
