const productForm = document.getElementById("productForm");
const navCartUrl = document.getElementById("navCartUrl");
const cart = {};
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
      if (json.status === "error") {
        alert("Error: " + json.payload);
      } else {
        productForm.reset();
        alert("Product added");
      }
    });
});

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

window.onload = handleCart;
