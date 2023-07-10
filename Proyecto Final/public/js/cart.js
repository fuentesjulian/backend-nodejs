let cart = {};

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

const handleCart = async () => {
  const response = await fetch("http://localhost:8080/api/carts", {
    method: "POST",
  });
  if (response.status === 201) {
    const json = await response.json();
    cart.id = json.payload._id;
    cart.products = json.payload.products;
  }
};

window.onload = handleCart;
