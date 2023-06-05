const socket = io();

const render = (messages) => {
  const html = messages
    .map((msg) => `<b>${msg.user}:</b> ${msg.message}`)
    .join("<br>");
  const chat = document.getElementById("chat");
  chat.innerHTML = html;
};

socket.on("messages", (messages) => {
  render(messages);
});

const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(productForm);
  let dataObj = {};
  formData.forEach((val, key) => (dataObj[key] = val));
  fetch("http://localhost:8080/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataObj),
  });
});
