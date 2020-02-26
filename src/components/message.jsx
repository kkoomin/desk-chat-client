import React from "react";

class Message extends React.Component {
  render() {
    const { data, username } = this.props;
    return (
      <div className={data.name === username ? "message right" : "message"}>
        <div className="message-info">
          {data.name} <span>{data.createdAt}</span>
        </div>
        <div className="message-content"> {data.message}</div>
      </div>
    );
  }
}

export default Message;
