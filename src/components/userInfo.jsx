import React from "react";
import API from "../API";

class UserInfo extends React.Component {
  componentDidMount() {
    API.getUser(this.props.username).then(data => {
      this.update_email.value = data.email;
      this.update_name.value = data.name;
    });
  }

  handleUpdateAccount = e => {
    e.preventDefault();
    const newPassword = this.update_password.value;
    const newPasswordConf = this.update_password_confirm.value;
    const newName = this.update_name.value;

    if (newPassword === newPasswordConf) {
      API.updateAccount(this.props.userId, newPassword, newName).then(() => {
        this.props.handleUserInfo();
      });
    } else {
      alert("패스워드가 일치하지 않습니다.");
      this.update_password.value = "";
      this.update_password_confirm.value = "";
    }
  };

  handleDeleteAccount = () => {
    let deleteConfirm = prompt(
      "정말 계정을 삭제하시겠습니까? \n삭제하려면 계정 이름을 입력해주세요."
    );
    if (deleteConfirm === this.props.username) {
      API.deleteAccount(this.props.username).then(() =>
        this.props.handleLogout()
      );
    }
  };

  render() {
    return (
      <div className="signup-form-container">
        <h1>회원 정보 변경하기</h1>

        <form onSubmit={this.handleUpdateAccount} className="update-form">
          <div className="update-form_email">
            <input
              name="email"
              placeholder="Email"
              ref={ref => (this.update_email = ref)}
              disabled
            />
          </div>
          <div className="update-form_password">
            <input
              name="password"
              type="password"
              placeholder="Password"
              ref={ref => (this.update_password = ref)}
              required
            />
            <input
              name="password_confirm"
              type="password"
              placeholder="Password Confirmation"
              ref={ref => (this.update_password_confirm = ref)}
              required
            />
          </div>
          <div className="update-form_name">
            <input
              name="name"
              placeholder="Name"
              ref={ref => (this.update_name = ref)}
              required
            />
          </div>

          <button className="main-big-btn" type="submit">
            변경하기
          </button>
        </form>
        <button
          onClick={this.handleDeleteAccount}
          className="main-big-btn bg-red"
        >
          탈퇴하기
        </button>
      </div>
    );
  }
}

export default UserInfo;
