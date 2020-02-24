import React from "react";
import SOCKET from "../SOCKET";

class ChatRoom extends React.Component {
  render() {
    return (
      <div className="chatroom-container">
        <div className="chat-messages"></div>

        <form id="message-form" onSubmit={e => SOCKET.receiveMessage(e)}>
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
