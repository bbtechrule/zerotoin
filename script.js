function sendMessage() {
  const msg = document.getElementById("message").value.toLowerCase();
  const output = document.getElementById("output");

  let imgSrc = "images/default.png";

  if (msg.includes("hello")) {
    imgSrc = "images/hello.jpg";
  } 
  else if (msg.includes("happy")) {
    imgSrc = "images/happy.png";
  }

  output.innerHTML = `<img src="${imgSrc}" alt="result image">`;
}
