import React from "react";
import API from "../API";

import Sidebar from "../components/sidebar";
import ChatRoom from "../components/chatroom";
import ChatRoomForm from "../components/chatroom-form";
import Footer from "../components/footer";

import moment from "moment";
import Cookies from "universal-cookie";
import UserInfo from "../components/userInfo";

const cookies = new Cookies();

// Socket Client-Side Connection //
// const url = "localhost";
const url = "70.12.225.186";
const io = require("socket.io-client");
const socket = io.connect(`http://${url}:8080`, {
  transports: ["websocket"],
  autoConnect: false
});

class MainPage extends React.Component {
  constructor() {
    super();

    this.state = {
      isCodeEntered: false,
      isUserInfoOpened: false,
      username: cookies.get("username"),
      userId: cookies.get("userId"),
      roomCode: cookies.get("roomCode") * 1,
      roomId: cookies.get("roomId"),
      users: [],
      messages: []
    };
  }

  UNSAFE_componentWillMount() {
    // If a user reload the page, the socket connection will be gone and the user automatically exit the chat room.
    this.exitRoom();
  }

  componentDidMount() {
    if (cookies.get("roomCode") && cookies.get("roomId")) {
      this.setState({ isCodeEntered: true });
    }

    socket.on("RECEIVE", data => {
      this.setState({
        messages: [...this.state.messages, data]
      });
    });
    socket.on("ROOMUSERS", userArray => {
      this.updateRoomUser(userArray);
    });
  }

  sendMessage = (e, id, name) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    const createdAt = moment().format("YYYY-MM-DD HH:mm");

    const data = {
      name,
      message,
      createdAt,
      roomCode: this.state.roomCode
    };
    const DBdata = {
      author: id,
      message,
      createdAt,
      room_id: this.state.roomId
    };

    socket.emit("SEND", data);

    API.addChat(e, DBdata);
  };

  renderMessage = async roomId => {
    const DBdata = await API.getChats(roomId);
    const chatData = DBdata.map(data => {
      return {
        _id: data._id,
        name: data.author.name,
        message: data.message,
        createdAt: moment(data.createdAt).format("YYYY-MM-DD HH:mm")
      };
    });
    this.setState({
      messages: chatData
    });
  };

  updateRoomUser = userArray => {
    this.setState({
      users: userArray
    });
  };

  enterRoom = roomData => {
    this.setState(
      {
        roomCode: roomData.code,
        roomId: roomData._id,
        isCodeEntered: !this.state.isCodeEntered
      },
      () => {
        const username = this.state.username;
        const roomCode = this.state.roomCode;

        socket.open();
        socket.emit("JOIN", { username, roomCode }, error => {
          if (error) {
            console.log(error);
          }
          io.emit("SEND", "A new user has joined!");
        });
      }
    );
  };

  exitRoom = roomCode => {
    socket.emit("EXIT", roomCode);
    socket.close();
    cookies.remove("roomCode");
    cookies.remove("roomId");
    this.setState({
      isCodeEntered: false,
      roomId: null,
      roomCode: null
    });
  };

  handleLogout = e => {
    this.exitRoom(this.state.roomCode);
    API.logout(e);
    this.props.toggleLogin();
  };

  handleUserInfo = () => {
    this.setState({
      isUserInfoOpened: !this.state.isUserInfoOpened
    });
  };

  render() {
    const {
      username,
      userId,
      roomCode,
      roomId,
      isCodeEntered,
      isUserInfoOpened,
      users,
      messages
    } = this.state;
    return (
      <div className="main-page">
        <div className="main-title">책상 밑의 핸드폰</div>
        <button
          className="userInfo-btn main-big-btn"
          onClick={e => this.handleUserInfo(e)}
        >
          내 정보수정
        </button>
        <button
          className="logout-btn main-big-btn"
          onClick={e => this.handleLogout(e)}
        >
          로그아웃
        </button>

        {isUserInfoOpened ? (
          <UserInfo
            userId={userId}
            username={username}
            handleLogout={this.handleLogout}
            handleUserInfo={this.handleUserInfo}
          />
        ) : (
          <>
            {isCodeEntered ? (
              <div className="chatroom-wrapper">
                <ChatRoom
                  username={username}
                  userId={userId}
                  roomCode={roomCode}
                  roomId={roomId}
                  isCodeEntered={isCodeEntered}
                  sendMessage={this.sendMessage}
                  renderMessage={this.renderMessage}
                  messages={messages}
                />
                <Sidebar
                  username={username}
                  roomCode={roomCode}
                  users={users}
                  exitRoom={this.exitRoom}
                />
              </div>
            ) : (
              <>
                <ChatRoomForm userId={userId} enterRoom={this.enterRoom} />
                <Footer />
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

export default MainPage;
