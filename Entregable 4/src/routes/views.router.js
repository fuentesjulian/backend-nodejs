// importo el router de express
import { Router } from "express";
// importo el item manager
import ItemManager from "../database/ItemManager.js";

// creo mi router
const router = Router();

// instancio el productManager, lo voy a usar cada vez que renderizo los productos
const productsManager = new ItemManager("./src/database/productos.json");

router.get("/", async (req, res) => {
  const products = await productsManager.getAll();
  res.render("index", { products });
});

router.get("/realtimeproducts",(req,res)=>{
  res.render("realTimeProducts")
})

export default router;
