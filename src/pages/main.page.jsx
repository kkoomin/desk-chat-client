import React from "react";
import API from "../API";

import Sidebar from "../components/sidebar";
import ChatRoom from "../components/chatroom";
import ChatRoomForm from "../components/chatroom-form";

import moment from "moment";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// Socket Client-Side Connection //
const io = require("socket.io-client");
// const socket = io.connect("http://70.12.225.186:8080");
const socket = io.connect("http://localhost:8080", {
  transports: ["websocket"]
});

class MainPage extends React.Component {
  constructor() {
    super();

    this.state = {
      isCodeEntered: false,
      username: cookies.get("username"),
      userId: cookies.get("userId"),
      roomCode: cookies.get("roomCode") * 1,
      roomId: cookies.get("roomId"),
      users: [],
      messages: []
    };
  }

  componentDidMount() {
    if (cookies.get("roomCode") && cookies.get("roomId")) {
      this.setState({ isCodeEntered: true });
    }
    // this.setState({ isCodeEntered: true }, () => {
    //   API.getRoomUsers(this.state.roomId).then(json => {
    //     this.setState({
    //       users: json.users
    //     });
    //   });
    // });

    // 새로고침 후 socket id가 변경되어 disconnect 되고 방에서 나가졌을 경우
    // if (this.state.users.filter(user => user.name === this.state.username).length === 0) {

    // }
    // 메세지 수신
    socket.on("RECEIVE", data => {
      // console.log(data);
      //  data : {name: "abc", message: "ㅎ", createdAt: "2020-02-25 19:37"}
      this.setState({
        messages: [...this.state.messages, data]
      });
    });

    // 채팅방의 유저목록 불러오기
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
    // console.log(DBdata);
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
    // API.getRoomUsers(this.state.roomId).then(json => {
    //   this.setState({
    //     users: json.users
    //   });
    // });
  };

  //{_id: "5e5519f538a16283437f29ec", title: "room1", code: 1234, createdAt: "2020-02-25T12:58:29.872Z", __v: 0}
  enterRoom = roomData => {
    // console.log(roomData);
    this.setState(
      {
        roomCode: roomData.code,
        roomId: roomData._id,
        isCodeEntered: !this.state.isCodeEntered
      },
      () => {
        const username = this.state.username;
        const roomCode = this.state.roomCode;

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
    // alert();
    socket.emit("EXIT", roomCode);
    socket.close();
    API.exitRoom(this.state.userId);
    cookies.remove("roomCode");
    cookies.remove("roomId");
    this.setState({
      isCodeEntered: false,
      roomId: null,
      roomCode: null
    });
  };

  render() {
    const {
      username,
      userId,
      roomCode,
      roomId,
      isCodeEntered,
      users,
      messages
    } = this.state;
    return (
      <div className="main-page">
        <div className="main-title">책상 밑의 핸드폰</div>
        <button
          className="logout-btn main-big-btn"
          onClick={e => {
            API.exitRoom(this.state.userId);
            API.logout(e);
            this.props.toggleLogin();
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
          </>
        ) : (
          <ChatRoomForm userId={userId} enterRoom={this.enterRoom} />
        )}
      </div>
    );
  }
}

export default MainPage;
