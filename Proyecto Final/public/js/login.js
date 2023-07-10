const loginForm = document.getElementById("loginForm");
const errorHtml = document.getElementById("error");
let product;
let redirectUrl = "/";

const renderError = (error) => {
  errorHtml.innerHTML = `<div class="alert alert-danger" role="alert">${error}</div>`;
};

const redirect = () => {
  loginForm.innerHTML = `<div>Login successful... redirecting!!!</div>`;
  setTimeout(() => {
    window.location.href = redirectUrl;
  }, 1500);
};

const handleLogin = async (e) => {
  errorHtml.innerHTML = "";
  e.preventDefault();
  const formData = new FormData(loginForm);
  let dataObj = {};
  formData.forEach((val, key) => (dataObj[key] = val));

  const data = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataObj),
  });
  const json = await data.json();
  if (json.status === "success") redirect();
  if (json.status === "error") renderError(json.payload);
};

loginForm.addEventListener("submit", handleLogin);

const handleLoad = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const product = urlParams.get("product");
  if (product) redirectUrl = `/products/${product}`;
};

window.onload = handleLoad;
