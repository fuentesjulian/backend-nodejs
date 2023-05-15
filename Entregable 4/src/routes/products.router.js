// importo el router de express
import { Router } from "express";
// importo el item manager
import ItemManager from "../database/ItemManager.js";
// import io de sockets
import { io } from "../server.js";

// creo mi router
const router = Router();
// instancio productsManager con el path
const productsManager = new ItemManager("./src/database/productos.json");

const emitProducts = async () => {
  const products = await productsManager.getAll();
  io.emit("products", products);
};

router
  .get("/", async (req, res) => {
    try {
      // obtengo todos los productos
      const allProducts = await productsManager.getAll();
      // obtengo el query limit
      const limit = req.query.limit;
      // si limit esta definido corto el array con ese limit, sino devuelvo todo
      const products = limit ? allProducts.slice(0, limit) : allProducts;
      // devuelvo objeto
      res.status(200).send({ status: "success", payload: { products } });
    } catch (error) {
      // si hay un error al leer con el item manager este catch ataja el error
      res.status(500).send({ status: "server error", error: error.message });
    }
  })
  .get("/:pid", async (req, res) => {
    try {
      const pid = req.params.pid;
      // obtengo el producto por id
      const product = await productsManager.getById(pid);
      if (product === undefined) {
        // si el id no matchea es un error de la ruta q puso el usuario
        res
          .status(400)
          .send({ status: "client error", error: "Parametros incorrectos" });
      } else {
        // si hay match devuelve el prod
        res.status(200).send({ status: "success", payload: { product } });
      }
    } catch (error) {
      // si hay un error al leer la base el catch ataja el error
      res.status(500).send({ status: "server error", error: error.message });
    }
  })
  .post("/", async (req, res) => {
    // obtengo los campos que necesito destructurando el body
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;

    // me aseguro que los campos obligatorios esten presentes
    if (title && description && code && price && stock && category) {
      try {
        const allProducts = await productsManager.getAll();
        const isDuplicate = allProducts.some((prod) => prod.code == code);
        if (isDuplicate) {
          res
            .status(400)
            .send({ status: "client error", error: "Codigo duplicado" });
        } else {
          const productData = {
            title,
            description,
            code,
            price,
            stock,
            status: true, // status es true por defecto
            category,
            thumbnails: thumbnails ?? [], // si no estan los thumbnails para homogeneizar mando un array vacio
          };
          // creo un nuevo producto
          const product = await productsManager.createOne(productData);
          // emito los productos, no es necesario el await
          emitProducts();
          // envio el producto creado
          res.status(201).send({ status: "success", payload: { product } });
        }
      } catch (error) {
        // si hay un error al grabar me devuelve un status 500 con el error
        res.status(500).send({ status: "server error", error: error.message });
      }
    } else {
      // si falta un parametro envio error
      res
        .status(400)
        .send({ status: "client error", error: "Faltan parametros" });
    }
  })
  .put("/:pid", async (req, res) => {
    const pid = req.params.pid;
    const {
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
      status,
    } = req.body;
    // asumo que siguen siendo obligatorios los campos
    if (title && description && code && price && stock && category) {
      try {
        let productData = {
          title,
          description,
          code,
          price,
          stock,
          category,
          thumbnails: thumbnails ?? [],
        };
        // en este caso, si status es par de los campos, asumo que queremos editarlo y lo agrego
        // ejemplo: quiero quitar de los publicados el producto, lo pongo en false
        if (status !== undefined) productData = { ...productData, status };
        // grabo
        const product = await productsManager.updateOne(pid, productData);
        // emito los productos, no es necesario el await
        emitProducts();
        // envio mensaje de grabado
        res.status(200).send({ status: "success", payload: { product } });
      } catch (error) {
        // si tengo un error al grabar devuelvo un 500
        res.status(500).send({ status: "server error", error: error.message });
      }
    } else {
      // si falta un parametro devuelvo un 400
      res
        .status(400)
        .send({ status: "client error", error: "Faltan parametros" });
    }
  })
  .delete("/:pid", async (req, res) => {
    const pid = req.params.pid;
    try {
      // elimino producto
      await productsManager.deleteOne(pid);
      // emito los productos, no es necesario el await
      emitProducts();
      res.status(200).send({ status: "success", payload: { id: pid } });
    } catch (error) {
      // si tengo error al eliminar producto un 500
      res.status(500).send({ status: "server error", error: error.message });
    }
  });

export default router;
