const productForm = document.getElementById("productForm");

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
