import { Router } from "express";
import ItemManager from "../database/ItemManager.js";

const router = Router();
const productsManager = new ItemManager("./src/database/productos.json");

router
  .get("/", async (req, res) => {
    const allProducts = await productsManager.getAll();
    const limit = req.query.limit;
    const products = limit ? allProducts.slice(0, limit) : allProducts;
    res.status(200).send(products);
  })
  .get("/:pid", async (req, res) => {
    const pid = req.params.pid;
    const product = await productsManager.getById(pid);
    res.status(200).send(product);
  })
  .post("/", async (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;

    if (title && description && code && price && stock && category) {
      const productData = {
        title,
        description,
        code,
        price,
        stock,
        status: true,
        category,
        thumbnails: thumbnails ?? [],
      };
      const product = await productsManager.createOne(productData);
      res.status(201).send(product);
    } else {
      res.status(400).send({ error: "Faltan parametros" });
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

    if (title && description && code && price && stock && category) {
      let productData = {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails: thumbnails ?? [],
      };
      if (status !== undefined) productData = { ...productData, status };

      const product = await productsManager.updateOne(pid, productData);
      res.status(200).send(`Modifico el producto id ${pid}`);
    } else {
      res.status(400).send({ error: "Faltan parametros" });
    }
  })
  .delete("/:pid", async (req, res) => {
    const pid = req.params.pid;
    await productsManager.deleteOne(pid);
    res.status(200).send({ success: `Producto id ${pid} eliminado` });
  });

export default router;
