function send() {
  const input = document.getElementById("msg");
  const chat = document.getElementById("chatBox");

  if (!input.value.trim()) return;

  const placeholder = document.querySelector(".placeholder");
  if (placeholder) placeholder.remove();

  const div = document.createElement("div");
  div.className = "msg";
  div.innerText = input.value;

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  input.value = "";
}
