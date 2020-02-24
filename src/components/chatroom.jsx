import React from "react";
import Message from "./message";
import API from "../API";

const io = require("socket.io-client");
const socket = io.connect("http://70.12.225.186:8080");

class ChatRoom extends React.Component {
  constructor() {
    super();

    this.state = {
      messages: []
    };

    socket.on("RECEIVE", data => {
      console.log(data);
      this.setState(
        {
          messages: [...this.state.messages, data]
        },
        () => {
          console.log(this.state.messages);
        }
      );
    });
  }

  componentDidMount() {
    this.renderMessage();
  }

  renderMessage = async () => {
    this.setState({
      messages: await API.getChats()
    });
  };

  sendMessage = (e, id) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    const data = { author: id, message };
    socket.emit("SEND", data, error => {
      console.log("Got an error", error);
    });
    API.addChat(e, data);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.sendMessage(e, this.props.userId);
    // this.renderMessage();
    e.target.elements.message.value = "";
    e.target.elements.message.focus();
  };

  render() {
    return (
      <div className="chatroom-container">
        <div className="chat-messages">
          {this.state.messages.map(message => {
            return (
              <Message
                key={message._id}
                data={message}
                username={this.props.username}
              />
            );
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
