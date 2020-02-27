import React from "react";
import Message from "./message";

class ChatRoom extends React.Component {
  componentDidMount() {
    this.props.renderMessage(this.props.roomId);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.sendMessage(e, this.props.userId, this.props.username);
    e.target.elements.message.value = "";
    e.target.elements.message.focus();
  };

  render() {
    return (
      <div className="chatroom-container">
        <div className="chat-messages">
          {this.props.messages.map((message, index) => {
            return (
              <Message
                key={index}
                data={message}
                username={this.props.username}
              />
            );
          })}
        </div>
        <form id="message-form" onSubmit={e => this.handleSubmit(e)}>
          <input
            id="chat-message_input"
            name="message"
            placeholder="Message"
            required
            autoComplete="off"
            autoFocus
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
