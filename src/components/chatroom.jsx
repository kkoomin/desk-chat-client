import React from "react";
import Message from "./message";
import API from "../API";
import moment from "moment";

const io = require("socket.io-client");
// const socket = io.connect("http://70.12.225.186:8080");
const socket = io.connect("http://localhost:8080");

class ChatRoom extends React.Component {
  constructor(props) {
    super();

    this.state = {
      messages: []
    };

    // Socket Events
    const roomData = {
      username: props.username,
      room: props.roomCode
    };

    socket.emit("JOIN", roomData, error => {
      if (error) {
        console.log(error);
      }
      // io.emit("SEND", "A new user has joined!");
    });

    socket.on("RECEIVE", data => {
      console.log(data);
      //  data : {name: "abc", message: "ㅎ", createdAt: "2020-02-25 19:37"}
      this.setState({
        messages: [...this.state.messages, data]
      });
    });
  }

  componentDidMount() {
    this.renderMessage(this.props.roomId);
  }

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

  sendMessage = (e, id, name) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    const createdAt = moment().format("YYYY-MM-DD HH:mm");

    const data = { name, message, createdAt };
    const DBdata = {
      author: id,
      message,
      createdAt,
      room_id: this.props.roomId
    };

    socket.emit("SEND", data, error => {
      console.log("Got an error", error);
    });
    API.addChat(e, DBdata);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.sendMessage(e, this.props.userId, this.props.username);
    // this.renderMessage();
    e.target.elements.message.value = "";
    e.target.elements.message.focus();
  };

  render() {
    return (
      <div className="chatroom-container">
        <div className="chat-messages">
          {this.state.messages.map((message, index) => {
            return <Message key={index} data={message} />;
          })}
        </div>
        <form id="message-form" onSubmit={e => this.handleSubmit(e)}>
          <input
            name="message"
            placeholder="Message"
            required
            autoComplete="off"
          />
          <button className="main-big-btn" type="submit">
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default ChatRoom;
