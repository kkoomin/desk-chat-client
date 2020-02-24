import React from "react";
import LoginForm from "../components/login-form";
import SignUpForm from "../components/signup-form";
import ChatRoomForm from "../components/chatroom-form";

class WelcomePage extends React.Component {
  state = {
    isLoginFormOpened: true
  };

  toggleForm = () => {
    this.setState({
      isLoginFormOpened: !this.state.isLoginFormOpened
    });
  };

  render() {
    return (
      <div className="welcome-page">
        <div className="welcome-title">책상 밑의 핸드폰</div>
        {this.props.isLoggedIn ? (
          <ChatRoomForm />
        ) : this.state.isLoginFormOpened ? (
          <LoginForm toggleForm={this.toggleForm} login={this.props.login} />
        ) : (
          <SignUpForm toggleForm={this.toggleForm} />
        )}
      </div>
    );
  }
}

export default WelcomePage;
