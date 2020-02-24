import React from "react";
import API from "../API";

class SignUpForm extends React.Component {
  state = {
    email: "",
    password: "",
    name: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const signUpData = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name
    };
    return (
      <div className="signup-form-container">
        <h1>회원가입하기</h1>

        <form
          onSubmit={e => API.submitSignUp(e, signUpData)}
          className="signup-form"
        >
          <div className="signup-form_email">
            <input
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
          </div>
          <div className="signup-form_password">
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>
          <div className="signup-form_name">
            <input
              name="name"
              placeholder="Name"
              onChange={this.handleChange}
            />
          </div>

          <button className="main-big-btn" type="submit">
            가입하기
          </button>
        </form>

        <button className="main-big-btn" onClick={this.props.toggleForm}>
          로그인 할래?
        </button>
      </div>
    );
  }
}

export default SignUpForm;
