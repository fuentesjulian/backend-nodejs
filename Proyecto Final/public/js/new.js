const productForm = document.getElementById("productForm");
const navCartUrl = document.getElementById("navCartUrl");

productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(productForm);
  let dataObj = {};
  formData.forEach((val, key) => (dataObj[key] = val));
  if (dataObj.thumbnail.length > 0) {
    dataObj = { ...dataObj, thumbnails: [dataObj.thumbnail] };
  }
  delete dataObj.thumbnail;
  fetch("http://localhost:8080/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataObj),
  })
    .then((data) => data.json())
    .then((json) => {
      // capto los errores
      if (json.status === "client error" || json.status === "server error") {
        alert(json.error);
      } else {
        productForm.reset();
        alert("Producto agregado");
      }
    });
});

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
};

window.onload = handleCart;
