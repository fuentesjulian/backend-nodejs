import express from "express";
import ProductManager from "./ProductManager.js";

const productManager = new ProductManager("./products.txt");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  const limit = req.query.limit;
  const productsQuery = await productManager.getProducts();
  if (!productsQuery.error) {
    const products = limit
      ? productsQuery.products.slice(0, limit)
      : productsQuery.products;

    return res.send(products);
  }
  return res.send("Ops, algo salio mal");
});

app.get("/products/:pid", async (req, res) => {
  const id = req.params.pid;
  const productsQuery = await productManager.getProductById(id);
  if (!productsQuery.error) {
    const product = productsQuery.product;
    if(product) return res.send(product);
    return res.send({error: "el producto no existe"})
  }
  return res.send("Ops, algo salio mal");
});

app.listen(8080, () => {
  console.log("Servidor escuchando en puerto 8080");
});
