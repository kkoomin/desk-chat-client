import React from "react";
import User from "./user";
import API from "../API";

class Sidebar extends React.Component {
  state = {
    title: ""
  };

  async componentDidMount() {
    this.setState({
      title: await API.getRoomTitle(this.props.roomCode)
    });
  }

  render() {
    return (
      <div className="sidebar-container">
        <div className="room-title">{this.state.title}</div>
        <div className="room-code">Room Code: {this.props.roomCode}</div>
        <ul className="users">
          {this.props.users.map(user => (
            <User key={user.id} user={user} />
          ))}
        </ul>
        <div className="room-exit">
          <button
            onClick={() => this.props.exitRoom(this.props.roomCode)}
            className="main-big-btn bg-red"
          >
            방 나가기
          </button>
        </div>
      </div>
    );
  }
}

export default Sidebar;
