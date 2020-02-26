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
        <div className="welcome-desc typing">
          한때 수업시간에 책상 서랍 안에서 핸드폰 자판 좀 쳐보신 분들,
          환영합니다.
        </div>
        {this.props.isLoggedIn ? (
          <ChatRoomForm />
        ) : this.state.isLoginFormOpened ? (
          <LoginForm
            toggleForm={this.toggleForm}
            toggleLogin={this.props.toggleLogin}
          />
        ) : (
          <SignUpForm toggleForm={this.toggleForm} />
        )}
        <div className="welcome-footer">©2020 kkoomin :D</div>
      </div>
    );
  }
}

export default WelcomePage;
