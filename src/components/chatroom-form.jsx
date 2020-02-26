import React from "react";
import API from "../API";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class ChatRoomForm extends React.Component {
  state = {
    isEnterForm: false
  };

  toggleEnterForm = () => {
    this.setState({
      isEnterForm: !this.state.isEnterForm
    });
  };

  handleSubmit = json => {
    if (json.status) {
      // API.updateUserRoom(this.props.userId, json.room._id);
      cookies.set("roomCode", json.room.code * 1, { path: "/" });
      cookies.set("roomId", json.room._id, { path: "/" });
      this.props.enterRoom(json.room);
    } else {
      alert(json.message);
      this.room_code.value = "";
    }
  };

  render() {
    return (
      <div className="signup-form-container">
        {this.state.isEnterForm ? (
          <>
            <h1>채팅방 입장하기</h1>

            <form
              onSubmit={e =>
                API.getRoom(e, { code: this.room_code.value }).then(json =>
                  this.handleSubmit(json)
                )
              }
              className="signup-form"
            >
              <input
                type="number"
                className="signup-form_code"
                name="code"
                placeholder="code"
                ref={ref => (this.room_code = ref)}
                min="1000"
                max="9999"
                required
                autoFocus
              />

              <button className="main-big-btn" type="submit">
                입장하기
              </button>
            </form>
            <button
              className="main-big-btn bg-yellow"
              onClick={this.toggleEnterForm}
            >
              방 만들기
            </button>
          </>
        ) : (
          <>
            <h1>채팅방 만들기</h1>

            <form
              onSubmit={e =>
                API.getRoom(e, {
                  title: this.room_title.value,
                  code: this.room_code.value
                }).then(json => this.handleSubmit(json))
              }
              className="signup-form"
            >
              <input
                name="title"
                placeholder="Room Title"
                ref={ref => (this.room_title = ref)}
                required
                autoFocus
              />
              <input
                type="number"
                name="code"
                placeholder="Code"
                ref={ref => (this.room_code = ref)}
                min="1000"
                max="9999"
                required
              />

              <button className="main-big-btn" type="submit">
                만들고 입장하기
              </button>
            </form>
            <button
              className="main-big-btn bg-yellow"
              onClick={this.toggleEnterForm}
            >
              코드로 입장하기
            </button>
          </>
        )}
      </div>
    );
  }
}

export default ChatRoomForm;
