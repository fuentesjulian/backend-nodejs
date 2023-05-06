import { Router } from "express";
import ItemManager from "../database/ItemManager.js";

const router = Router();
const cartsManager = new ItemManager("./src/database/carrito.json");

router
  .post("/", async (req, res) => {
    const cartData = { products: [] };
    try {
      const cart = await cartsManager.createOne(cartData);
      res.status(201).send(cart);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  })
  .get("/:cid", async (req, res) => {
    const cid = req.params.cid;
    try {
      const cart = await cartsManager.getById(cid);
      if (cart) {
        const products = cart.products;
        res.status(200).send(products);
      } else {
        res.status(400).send({ error: "Parametros incorrectos" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  })
  .post("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const { quantity } = req.body;
    try {
      const cart = await cartsManager.getById(cid);
      if (cart === undefined || quantity === undefined) {
        res.status(400).send({ error: "Parametros incorrectos" });
      } else {
        let products = cart.products;
        const inCart = products.some((prod) => prod.product == pid);
        if (inCart) {
          products = products.map((prod) => {
            if (prod.product == pid) return { ...prod, quantity };
            return prod;
          });
        } else {
          products.push({ product: pid, quantity });
        }
        await cartsManager.updateOne(cid, { products });
        res.status(201).send({
          success: `Se agregaron ${quantity} unidades del prod id ${pid} en el cart ${cid}`,
        });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  })
  .delete("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    console.log("cid", typeof cid);
    console.log("pid", typeof pid);
    try {
      const cart = await cartsManager.getById(cid);
      if (cart === undefined) {
        res.status(400).send({ error: "Parametros incorrectos" });
      } else {
        let products = cart.products;
        products = products.filter((prod) => prod.product !== pid);
        await cartsManager.updateOne(cid, { products });
        res
          .status(200)
          .send({ success: `Eliminado el prod id ${pid} en el cart ${cid}` });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

export default router;
