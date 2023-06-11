let cart;
const navCartUrl = document.getElementById("navCartUrl");

const redirect = (pid) => {
  window.location.href = `http://localhost:8080/products/${pid}`;
};

const handleCart = async () => {
  let cartId = localStorage.getItem("cartId");
  if (cartId) cart = await getCart(cartId);
  if (!cart) cart = await createCart();
  localStorage.setItem("cartId", cart.id);
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

window.onload = handleCart;