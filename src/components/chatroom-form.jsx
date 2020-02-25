import React from "react";
import API from "../API";

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
      API.updateUserRoom(this.props.userId, json.room._id);
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
              />

              <button className="main-big-btn" type="submit">
                입장하기
              </button>
            </form>
            <button className="main-big-btn" onClick={this.toggleEnterForm}>
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
              />
              <input
                type="number"
                name="code"
                placeholder="code"
                ref={ref => (this.room_code = ref)}
                min="1000"
                max="9999"
                required
              />

              <button className="main-big-btn" type="submit">
                만들고 입장하기
              </button>
            </form>
            <button className="main-big-btn" onClick={this.toggleEnterForm}>
              방 코드로 입장하기
            </button>
          </>
        )}
      </div>
    );
  }
}

export default ChatRoomForm;
