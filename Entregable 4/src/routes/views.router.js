// importo el router de express
import { Router } from "express";
// importo el item manager
import productsManager from "../database/ProductManager.js";

// creo mi router
const router = Router();

router.get("/", async (req, res) => {
  const products = await productsManager.getAll();
  res.render("index", { products });
});

router.get("/realtimeproducts",(req,res)=>{
  res.render("realTimeProducts")
})

export default router;
