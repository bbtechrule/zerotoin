function sendMessage() {
  const input = document.getElementById("messageInput");
  const chatBox = document.getElementById("chat-box");

  if (input.value.trim() === "") return;

  const messageDiv = document.createElement("div");
  messageDiv.className = "message";
  messageDiv.textContent = input.value;

  chatBox.append
