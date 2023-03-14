import { io } from "https://cdn.socket.io/4.3.0/socket.io.esm.min.js";

const messages = document.querySelector("main");
const input = document.querySelector("input");

const socket = io();

const addMessage = (msg, isFromMe = false) => {
  const box = document.createElement("div");

  if (isFromMe === true) {
    box.className = "me";
  }

  box.innerText = msg;
  messages.append(box);
};

const sendMessage = (msg) => {
  addMessage(msg, true);
  socket.emit("message", { text: msg });
};

socket.on("message", (msg) => {
  addMessage(msg.text, false);
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const {
      target: { value },
    } = e;

    sendMessage(value);
    input.value = "";
  }
});
