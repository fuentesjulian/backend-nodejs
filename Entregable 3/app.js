// importo express
import express from "express";
// importo el product manager
import ProductManager from "./ProductManager.js";

// instancia de prod manager
const productManager = new ProductManager("./products.txt");

const app = express();
// url encoded
app.use(express.urlencoded({ extended: true }));

// ruta get de products donde puedo settear el limite de busqueda
// si no pongo limite devuelve el array entero de productos
// si pongo limite limita el el tamaño del array a la cantidad que pase en limit
app.get("/products", async (req, res) => {
  // obtengo el limit por query
  const limit = req.query.limit;
  const productsQuery = await productManager.getProducts();
  // checkeo si tengo algun error para conectar con la DB
  if (!productsQuery.error) {
    // si no hay error limito el array al limite que pase por query
    const products = limit
      ? productsQuery.products.slice(0, limit)
      : productsQuery.products;
    // devuelvo el array
    return res.send(products);
  }
  // si hay error al conectar con la DB devuelvo un error
  return res.send("Ops, algo salio mal");
});

// ruta get de products donde puedo especificar el id de un producto
// si el producto existe devuelve el producto
// si no existe devuelve un objeto de error
app.get("/products/:pid", async (req, res) => {
  // busco por parametros
  const id = req.params.pid;
  const productsQuery = await productManager.getProductById(id);
  // checkeo si hay error al conectar con la DB
  if (!productsQuery.error) {
    // si no hay error obtengo el product
    const product = productsQuery.product;
    // si el productQuery tiene data devuelvo el product
    if (product) return res.send(product);
    // si no tiene data (productManager devuelve false) devuelvo un objeo vacio
    return res.send({ error: "el producto no existe" });
  }
  // si hay error al conectar con la DB devuelvo un error
  return res.send("Ops, algo salio mal");
});

// inicio el server en puerto 8080
app.listen(8080, () => {
  console.log("Servidor escuchando en puerto 8080");
});
