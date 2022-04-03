const socket = io("http://localhost:3000");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

function appendMsg(message, position) {
	const messageElement = document.createElement("div");
	messageElement.innerText = message;
	messageElement.classList.add("message");
	messageElement.classList.add(position);
	messageElement.style.opacity = 1;
	messageContainer.append(messageElement);
}

const name = prompt("Enter your username to join: ");
socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
	appendMsg(`${name} joined the room!`, "center");
});

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const message = messageInput.value;
	appendMsg(`You: ${message}`, "right");
	socket.emit("send", message);
	messageInput.value = "";
});

socket.on("receive", (data) => {
	appendMsg(`${data.name}: ${data.message}`, "left");
});

socket.on("left", (name) => {
	appendMsg(`${name} left the room`, "center");
});
