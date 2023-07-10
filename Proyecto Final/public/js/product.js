let cart = {};

const minusBtn = document.getElementById("minusBtn");
const plustBtn = document.getElementById("plusBtn");
const quantity = document.getElementById("quantity");
const buyBtn = document.getElementById("buyBtn");
const stock = parseInt(document.getElementById("stock").innerText);
const prodId = document.getElementById("id").innerText;
const inCartStr = document.getElementById("inCart");
const cartUrl = document.getElementById("cartUrl");
const navCartUrl = document.getElementById("navCartUrl");
const delBtn = document.getElementById("delBtn");
let inCart = false;

const handleCart = async () => {
  const response = await fetch("http://localhost:8080/api/carts", {
    method: "POST",
  });
  if (response.status === 201) {
    const json = await response.json();
    cart.id = json.payload._id;
    cart.products = json.payload.products;
    inCart = cart.products.find((prod) => prod.product === prodId);
    cartUrl.href = `http://localhost:8080/carts/${cart.id}`;
    navCartUrl.href = `http://localhost:8080/carts/${cart.id}`;
  }

  if (inCart) {
    quantity.innerText = inCart.quantity;
    inCartStr.innerText = `${inCart.quantity} in cart`;
    delBtn.style.display = "block";
  } else {
    quantity.innerText = 1;
    inCartStr.innerText = "Purchase now!";
    delBtn.style.display = "none";
  }

  if (stock === 0) buyBtn.className = buyBtn.className + " disabled";
};

const addProd = async () => {
  const qty = parseInt(quantity.innerText);
  console.log(cart.id);
  console.log(prodId);
  console.log(qty);
  const response = await fetch(
    `http://localhost:8080/api/carts/${cart.id}/products/${prodId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: qty }),
    }
  );
  const json = await response.json();
  handleCart();
};

const removeProd = async () => {
  const response = await fetch(
    `http://localhost:8080/api/carts/${cart.id}/products/${prodId}`,
    {
      method: "DELETE",
    }
  );
  handleCart();
};

minusBtn.onclick = () => {
  let q = parseInt(quantity.innerText);
  if (q > 1) {
    q--;
    quantity.innerText = q;
  }
};

plusBtn.onclick = () => {
  let q = parseInt(quantity.innerText);
  if (q < stock) {
    q++;
    quantity.innerText = q;
  }
};

buyBtn.onclick = () => {
  if (cart.id) {
    addProd();
  } else {
    window.location.href = `http://localhost:8080/login?product=${prodId}`;
  }
};

delBtn.onclick = () => {
  removeProd();
};

window.onload = handleCart;
