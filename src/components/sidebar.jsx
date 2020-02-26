import React from "react";
import User from "./user";

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar-container">
        <h3 className="room-code">Room Code: {this.props.roomCode}</h3>

        <h3 className="list-title">이 방에 있는 사람</h3>
        <ul className="users">
          {this.props.users.map(user => (
            <User key={user._id} user={user} />
          ))}
        </ul>
        <div className="room-exit">
          <button className="main-big-btn bg-red">방 나가기</button>
        </div>
      </div>
    );
  }
}

export default Sidebar;
