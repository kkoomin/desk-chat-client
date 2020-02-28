import Cookies from "universal-cookie";
const cookies = new Cookies();

// const url = "http://192.168.35.159:8080";
const url = "http://localhost:8080";

/*
 * USER
 */
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
        cookies.set("username", json.message[0].name, { path: "/" });
        cookies.set("userId", json.message[0]._id, { path: "/" });
      } else {
        alert(json.message);
      }
    });
};

const submitSignUp = (e, data) => {
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
  return fetch(`${url}/user/signup`, options)
    .then(res => res.json())
    .then(json => alert(json.message));
};

const logout = e => {
  if (e) e.preventDefault();
  cookies.remove("username");
  cookies.remove("userId");
  cookies.remove("roomCode");
  cookies.remove("roomId");
};

const updateAccount = (id, password, name) => {
  const options = {
    method: "POST",
    // credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ password, name })
  };
  return fetch(`${url}/user/${id}`, options)
    .then(res => res.json())
    .then(json => alert(json.message));
};

const deleteAccount = username => {
  const options = {
    method: "POST",
    // credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ username })
  };
  return fetch(`${url}/user/deleteUser`, options)
    .then(res => res.json())
    .then(json => alert(json.message));
};

const getUser = username => {
  return fetch(`${url}/user/${username}`)
    .then(res => res.json())
    .then(json => {
      if (json.status) {
        return json.user;
      } else {
        alert(json.message);
      }
    });
};

/*
 * CHAT
 */
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

const getChats = room_id => {
  const options = {
    method: "POST",
    // credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ room_id })
  };
  return fetch(`${url}/chat/getChats`, options)
    .then(res => res.json())
    .then(json => json.chats);
};

/*
 * ROOM
 */
const getRoom = (e, roomData) => {
  e.preventDefault();
  const options = {
    method: "POST",
    // credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ roomData })
  };
  return fetch(`${url}/room/getRoom`, options).then(res => res.json());
};

const getRoomTitle = roomCode => {
  return fetch(`${url}/room/${roomCode}`)
    .then(res => res.json())
    .then(json => json.title);
};
export default {
  submitLogin,
  submitSignUp,
  logout,
  updateAccount,
  deleteAccount,
  getUser,
  addChat,
  getChats,
  getRoom,
  getRoomTitle
};
