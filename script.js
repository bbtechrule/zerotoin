const textarea = document.getElementById("msg");

textarea.addEventListener("input", () => {
  textarea.style.height = "auto";
  textarea.style.height = Math.min(textarea.scrollHeight, 90) + "px";
});

function send() {
  const chat = document.getElementById("chatBox");

  if (!textarea.value.trim()) return;

  const placeholder = document.querySelector(".placeholder");
  if (placeholder) placeholder.remove();

  const div = document.createElement("div");
  div.className = "msg";
  div.innerText = textarea.value;

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;

  textarea.value = "";
  textarea.style.height = "auto";
}
