let cart;

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

const handleCart = async () => {
  let cartId = localStorage.getItem("cartId");
  if (cartId) cart = await getCart(cartId);
  if (!cart) cart = await createCart();
  localStorage.setItem("cartId", cart.id);
  const inCart = cart.products.find((prod) => prod.product === prodId);
  if (inCart) {
    quantity.innerText = inCart.quantity;
    inCartStr.innerText = `${inCart.quantity} en carrito`;
    delBtn.style.display = "inline"
  } else {
    quantity.innerText = 1;
    inCartStr.innerText = "Agrega a tu carrito!"
    delBtn.style.display = "none"
  }
  cartUrl.href = `http://localhost:8080/carts/${cart.id}`;
  navCartUrl.href = `http://localhost:8080/carts/${cart.id}`;
};

const getCart = async (cid) => {
  const response = await fetch(`http://localhost:8080/api/carts/${cid}`);
  const json = await response.json();
  if (json.status === "success") {
    const id = json.payload.cart._id;
    const products = json.payload.cart.products;
    const cart = { id, products };
    return cart;
  } else {
    return false;
  }
};

const createCart = async () => {
  const response = await fetch(`http://localhost:8080/api/carts`, {
    method: "POST",
  });
  const json = await response.json();
  const id = json.payload.cart._id;
  const products = json.payload.cart.products;
  const cart = { id, products };
  return cart;
};

const addProd = async () => {
  const qty = parseInt(quantity.innerText);
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
  addProd();
};

delBtn.onclick = () => {
  removeProd();
};

window.onload = handleCart;
