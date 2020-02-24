import React from "react";

class Message extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div className="message">
        <div className="message-info">{data.author.name}</div>
        <div className="message-content"> {data.message}</div>
      </div>
    );
  }
}

export default Message;
