import { Router } from "express";
import ItemManager from "../database/ItemManager.js";

const router = Router();
const cartsManager = new ItemManager("./src/database/carrito.json");

router
  .post("/", async (req, res) => {
    const cartData = { products: [] };
    const cart = await cartsManager.createOne(cartData);
    res.status(201).send(cart);
  })
  .get("/:cid", async (req, res) => {
    const cid = req.params.cid;
    const cart = await cartsManager.getById(cid);
    const products = cart.products;
    res.status(200).send(products);
  })
  .post("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const { quantity } = req.body;
    const cart = await cartsManager.getById(cid);
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
    res.status(201).send(`Agrego cantidad de prod id ${pid} en el cart ${cid}`);
  });

export default router;
