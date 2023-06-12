let cart;

const substractOne = async (prodId) => {
  const quantity = document.getElementById(`quantity-${prodId}`);
  let qty = parseInt(quantity.innerText);
  if (qty > 1) {
    qty--;
    const response = await fetch(
      `http://localhost:8080/api/carts/${cart.id}/products/${prodId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: qty }),
      }
    );
    const json = await response.json();
    if (json.status === "success") quantity.innerText = qty;
  }
  handleCart();
};
const addOne = async (prodId) => {
  const quantity = document.getElementById(`quantity-${prodId}`);
  let qty = parseInt(quantity.innerText);
  qty++;
  const response = await fetch(
    `http://localhost:8080/api/carts/${cart.id}/products/${prodId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: qty }),
    }
  );
  const json = await response.json();
  if (json.status === "success") quantity.innerText = qty;
  handleCart();
};
const removeProd = async (prodId) => {
  const response = await fetch(
    `http://localhost:8080/api/carts/${cart.id}/products/${prodId}`,
    {
      method: "DELETE",
    }
  );
  const json = await response.json();
  if (json.status === "success") {
    const cartItem = document.getElementById(`cart-${prodId}`);
    cartItem.remove();
  }
  handleCart();
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

const handleCart = async () => {
  let cartId = localStorage.getItem("cartId");
  if (cartId) cart = await getCart(cartId);
  if (!cart) cart = await createCart();
  localStorage.setItem("cartId", cart.id);
  navCartUrl.href = `http://localhost:8080/carts/${cart.id}`;
  if (cart.products.length === 0) {
    const cartInfo = document.getElementById("cartInfo");
    cartInfo.innerHTML = `<h1>Your cart is empty! <a href="/products">Go shopping!</a></h1>`;
  }
};

window.onload = handleCart;
