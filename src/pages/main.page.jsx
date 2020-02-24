import React from "react";
import API from "../API";

import Sidebar from "../components/sidebar";
import ChatRoom from "../components/chatroom";

import Cookies from "universal-cookie";
const cookies = new Cookies();

class MainPage extends React.Component {
  state = {
    username: cookies.get("username"),
    userId: cookies.get("userId")
  };

  // componentDidMount() {}

  render() {
    return (
      <div className="main-page">
        <div className="main-title">책상 밑의 핸드폰</div>
        <button
          className="logout-btn main-big-btn"
          onClick={e => {
            API.logout(e);
            this.props.login();
          }}
        >
          로그아웃
        </button>
        <ChatRoom username={this.state.username} userId={this.state.userId} />
        <Sidebar username={this.state.username} />
      </div>
    );
  }
}

export default MainPage;
