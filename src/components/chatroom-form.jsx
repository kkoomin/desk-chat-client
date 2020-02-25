import React from "react";
// import API from "../API";

class ChatRoomForm extends React.Component {
  state = {
    // username: "",
    code: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    // const roomData = {
    //   username: this.state.username,
    //   code: this.state.code
    // };
    return (
      <div className="signup-form-container">
        <h1>채팅룸 입장하기</h1>

        <form
          //   onSubmit={e => API.submitRoom(e, roomData)}
          className="signup-form"
        >
          <input
            className="signup-form_code"
            name="code"
            placeholder="code"
            onChange={this.handleChange}
          />

          <button className="main-big-btn" type="submit">
            입장하기
          </button>
        </form>
      </div>
    );
  }
}

export default ChatRoomForm;
