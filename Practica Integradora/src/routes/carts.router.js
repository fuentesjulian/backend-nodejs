// importo el router de express
import { Router } from "express";
import cartService from "../services/carts.service.js";
// creo mi router
const router = Router();

router
  .post("/", async (req, res) => {
    // creo el array de productos vacio que por default voy a tener apenas creo el cart
    const cartData = { products: [] };
    try {
      // grabo el cart
      const cart = await cartService.new();
      // envio el cart grabado
      res.status(201).send({ status: "success", payload: { cart } });
    } catch (error) {
      // si tengo un error para grabar, devuelvo un 500
      res.status(500).send({ status: "server error", error: error.message });
    }
  })
  .get("/:cid", async (req, res) => {
    // busco el id del cart
    const cid = req.params.cid;
    try {
      // leo el cart en la DB
      const cart = await cartService.getOne(cid);
      res.status(200).send({ status: "success", payload: { cart } });
    } catch (error) {
      // si hay un error para leer la DB devuelvo 500
      res.status(500).send({ status: "server error", error: error.message });
    }
  })
  .post("/:cid/product/:pid", async (req, res) => {
    // id del cart
    const cid = req.params.cid;
    // id del producto
    const pid = req.params.pid;
    try {
      // obtengo por id el cart y el producto
      const products = await cartService.add(cid, pid);
      res.status(201).send({ status: "success", payload: { products } });
    } catch (error) {
      // si tengo un error en la bd devuelvo un 500
      res.status(500).send({ status: "server error", error: error.message });
    }
  })
  .delete("/:cid/product/:pid", async (req, res) => {
    // bonus: para eliminar productos del cart
    // misma logica que el put, checkeo que exista el cart
    // la diferencia es que en vez que agregar/modificar el array de products, la filtro
    const cid = req.params.cid;
    const pid = req.params.pid;
    try {
      const products = await cartService.delete(cid, pid);
      res.status(200).send({ status: "success", payload: { products } });
    } catch (error) {
      // si tengo un error al grabar o leer devuelvo un 500
      res.status(500).send({ status: "server error", error: error.message });
    }
  });

export default router;
