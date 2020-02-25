import Cookies from "universal-cookie";
const cookies = new Cookies();

// const url = "http://70.12.225.186:8080";
const url = "http://localhost:8080";

const submitLogin = (e, data) => {
  e.preventDefault();
  const options = {
    method: "POST",
    // credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ user: data })
  };
  return fetch(`${url}/user/login`, options)
    .then(res => res.json())
    .then(json => {
      if (json.status) {
        console.log(json.message);
        cookies.set("username", json.message[0].name, { path: "/" });
        cookies.set("userId", json.message[0]._id, { path: "/" });
      } else {
        alert(json.message);
      }
    });
};

const submitSignUp = (e, data) => {
  e.preventDefault();
  //   console.log(data);
  const options = {
    method: "POST",
    // credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ user: data })
  };
  return fetch(`${url}/user/signup`, options)
    .then(res => res.json())
    .then(json => alert(json.message));
};

const logout = e => {
  e.preventDefault();
  cookies.remove("username");
  cookies.remove("userId");
};

const addChat = (e, data) => {
  e.preventDefault();
  const options = {
    method: "POST",
    // credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ chat: data })
  };
  return fetch(`${url}/chat/addChat`, options);
};

const getChats = () => {
  return fetch(`${url}/chat/getChats`)
    .then(res => res.json())
    .then(json => json.chats);
};

export default {
  submitLogin,
  submitSignUp,
  logout,
  addChat,
  getChats
};
