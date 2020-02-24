import Cookies from "universal-cookie";
const cookies = new Cookies();

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
};

export default {
  submitLogin,
  submitSignUp,
  logout
};
