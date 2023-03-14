import { io } from "https://cdn.socket.io/4.3.0/socket.io.esm.min.js";

const messages = document.querySelector("main");
const input = document.querySelector(".message");
const uname = document.querySelector(".uname");
const emojis = document.querySelector('.emojis');

const socket = io();

emojis.addEventListener('input', () => {
  input.value += emojis.value;
  emojis.value = "";
})

const addMessage = (msg, isFromMe = false) => {
  const { user, text } = msg;
  const box = document.createElement("div");

  if (isFromMe === true) {
    box.className = "me";
  }

  box.innerText = `${user}: ${text}`;
  messages.append(box);
};

const sendMessage = (msg, user) => {
  addMessage({ user, text: msg }, true);
  socket.emit("message", { user, text: msg });
};

socket.on("message", (msg) => {
  addMessage(msg, false);
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const {
      target: { value },
    } = e;

    sendMessage(value, uname.value);
    input.value = "";
  }
});
