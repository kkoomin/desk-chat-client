import React from "react";
import API from "../API";

class SignUpForm extends React.Component {
  handleSubmit = e => {
    API.submitSignUp(e, {
      email: this.signup_email.value,
      password: this.signup_password.value,
      name: this.signup_name.value
    });
    this.signup_email.value = "";
    this.signup_password.value = "";
    this.signup_name.value = "";
  };

  render() {
    return (
      <div className="signup-form-container">
        <h1>회원가입하기</h1>

        <form onSubmit={this.handleSubmit} className="signup-form">
          <div className="signup-form_email">
            <input
              name="email"
              placeholder="Email"
              ref={ref => (this.signup_email = ref)}
              autoFocus
            />
          </div>
          <div className="signup-form_password">
            <input
              name="password"
              type="password"
              placeholder="Password"
              ref={ref => (this.signup_password = ref)}
            />
          </div>
          <div className="signup-form_name">
            <input
              name="name"
              placeholder="Name"
              ref={ref => (this.signup_name = ref)}
            />
          </div>

          <button className="main-big-btn" type="submit">
            가입하기
          </button>
        </form>

        <button
          className="main-big-btn bg-yellow"
          onClick={this.props.toggleForm}
        >
          로그인 할래?
        </button>
      </div>
    );
  }
}

export default SignUpForm;
