const socket = io();


// renderizo los productos
const render = (products) => {
  const html = products
    .map((prod) => {
      const placeholder = "https://placehold.co/200x200";
      return `<div class="card" style="width: 18rem;">
    <img src="${
      prod.thumbnails.length ? prod.thumbnails[0] : placeholder
    }" class="card-img-top" alt="..." />
    <div class="card-body">
    <h5 class="card-title">${prod.title}</h5>
    <p class="card-text">${prod.category} - Codigo: ${prod.code}</p>
    <p class="card-text">$ ${prod.price}</p>
    <p class="card-text">Stock ${prod.stock}</p>
    <p class="card-text">${prod.description}</p>
    </div>
</div>`;
    })
    .join("");
  document.getElementById("products").innerHTML = html;
};

socket.on("products", (products) => {
  render(products);
});

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
