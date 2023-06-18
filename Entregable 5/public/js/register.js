const registerForm = document.getElementById("registerForm");
const errorHtml = document.getElementById("error");

const renderSuccess = () => {
  registerForm.innerHTML = `<div>Signup successfull. <a href="/login">Login</a></div>`;
};

const renderError = (error) => {
  errorHtml.innerHTML = `<div class="alert alert-danger" role="alert">${error}</div>`;
};

const handleSignup = async (e) => {
  errorHtml.innerHTML = "";
  e.preventDefault();
  const formData = new FormData(registerForm);
  let dataObj = {};
  formData.forEach((val, key) => (dataObj[key] = val));

  const data = await fetch("http://localhost:8080/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataObj),
  });
  const json = await data.json();
  if (json.status === "success") renderSuccess();
  if (json.status === "error") renderError(json.payload);
};

registerForm.addEventListener("submit", handleSignup);
