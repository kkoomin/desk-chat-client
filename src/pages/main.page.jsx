import React from "react";
import API from "../API";

import Sidebar from "../components/sidebar";
import ChatRoom from "../components/chatroom";
import ChatRoomForm from "../components/chatroom-form";

import Cookies from "universal-cookie";
const cookies = new Cookies();

class MainPage extends React.Component {
  state = {
    isCodeEntered: false,
    username: cookies.get("username"),
    userId: cookies.get("userId"),
    roomCode: "",
    roomId: ""
  };

  componentDidMount() {
    if (cookies.get("roomCode") && cookies.get("roomId")) {
      this.setState({
        roomCode: cookies.get("roomCode"),
        roomId: cookies.get("roomId"),
        isCodeEntered: true
      });
    }
  }

  //{_id: "5e5519f538a16283437f29ec", title: "room1", code: 1234, createdAt: "2020-02-25T12:58:29.872Z", __v: 0}
  enterRoom = roomData => {
    console.log(roomData);
    this.setState(
      {
        roomCode: roomData.code,
        roomId: roomData._id,
        isCodeEntered: !this.state.isCodeEntered
      },
      () => {
        cookies.set("roomCode", roomData.code, { path: "/" });
        cookies.set("roomId", roomData._id, { path: "/" });
      }
    );
  };

  render() {
    const { username, userId, roomCode, roomId, isCodeEntered } = this.state;
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

        {isCodeEntered ? (
          <>
            <ChatRoom
              username={username}
              userId={userId}
              roomCode={roomCode}
              roomId={roomId}
              isCodeEntered={isCodeEntered}
              // toggleEnterForm={this.toggleEnterForm}
            />
            <Sidebar username={username} />
          </>
        ) : (
          <ChatRoomForm userId={userId} enterRoom={this.enterRoom} />
        )}
      </div>
    );
  }
}

export default MainPage;
