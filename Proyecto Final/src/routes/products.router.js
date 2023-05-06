import { Router } from "express";
import ItemManager from "../database/ItemManager.js";

const router = Router();
const productsManager = new ItemManager("./src/database/productos.json");

router
  .get("/", async (req, res) => {
    try {
      const allProducts = await productsManager.getAll();
      const limit = req.query.limit;
      const products = limit ? allProducts.slice(0, limit) : allProducts;
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  })
  .get("/:pid", async (req, res) => {
    try {
      const pid = req.params.pid;
      const product = await productsManager.getById(pid);
      if (product === undefined) {
        res.status(400).send({ error: "Parametros incorrectos" });
      } else {
        res.status(200).send(product);
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  })
  .post("/", async (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;

    if (title && description && code && price && stock && category) {
      try {
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
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
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
        if (status !== undefined) productData = { ...productData, status };
        const product = await productsManager.updateOne(pid, productData);
        res.status(200).send(`Modifico el producto id ${pid}`);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    } else {
      res.status(400).send({ error: "Faltan parametros" });
    }
  })
  .delete("/:pid", async (req, res) => {
    const pid = req.params.pid;
    try {
      await productsManager.deleteOne(pid);
      res.status(200).send({ success: `Producto id ${pid} eliminado` });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

export default router;
