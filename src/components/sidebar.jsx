import React from "react";

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar-container">
        <h2 className="room-title">채팅방 제목</h2>
        <h3 className="list-title">너랑 대화하는 사람</h3>
        {/* <ul class="users"></ul> */}
      </div>
    );
  }
}

export default Sidebar;
