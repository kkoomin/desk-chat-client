const io = require("socket.io-client");
const socket = io.connect("http://localhost:8080");

const receiveMessage = e => {
  e.preventDefault();
  const message = e.target.elements.message.value;
  // console.log(message);
  socket.emit("message", message, error => {
    console.log("done");
  });
};

export default {
  receiveMessage
};
