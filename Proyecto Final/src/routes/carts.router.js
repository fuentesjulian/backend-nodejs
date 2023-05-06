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
    res.status(201).send(`Agrego cantidad de prod id ${pid} en el cart ${cid}`);
  });

export default router;
