let cart = {};
const navCartUrl = document.getElementById("navCartUrl");

const img = document.getElementById("img");
const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const age = document.getElementById("age");
const email = document.getElementById("email");
const role = document.getElementById("role");

const handleCart = async () => {
  const response = await fetch("http://localhost:8080/api/carts", {
    method: "POST",
  });
  if (response.status === 201) {
    const json = await response.json();
    cart.id = json.payload._id;
    cart.products = json.payload.products;
    navCartUrl.href = `http://localhost:8080/carts/${cart.id}`;
  }
};

const handleProfile = async () => {
  const response = await fetch("http://localhost:8080/api/auth/current");
  if (response.status === 200) {
    const json = await response.json();
    const user = json.payload;
    img.src = user.img;
    first_name.innerText = user.first_name;
    last_name.innerText = user.last_name;
    age.innerText = user.age;
    email.innerText = user.email;
    role.innerText = user.role;
  }
};

const handleData = () => {
  handleCart();
  handleProfile();
};

window.onload = handleData;
