// importo el router de express
import { Router } from "express";
// importo el productDato
import productDao from "../dao/Products.DAO.js";
// importo el cartDao
import cartDao from "../dao/Carts.DAO.js";

// creo mi router
const router = Router();

router
  .post("/", async (req, res) => {
    // creo el array de productos vacio que por default voy a tener apenas creo el cart
    const cartData = { products: [] };
    try {
      // grabo el cart
      const cart = await cartDao.createOne(cartData);
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
      const cart = await cartDao.getOne(cid);
      if (cart) {
        // si existe cart devuelvo los productos (puede ser un array vacio [])
        const products = cart.products;
        res.status(200).send({ status: "success", payload: { products } });
      } else {
        // si no existe un cart devuelvo un error 400, asumo que el usuario esta jugando con las rutas
        res
          .status(400)
          .send({ status: "client error", error: "Parametros incorrectos" });
      }
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

      const cart = await cartDao.getOne(cid);
      const product = await productDao.getOne(pid);

      // si no existe un cart o la cantidad no esta setteada devuelvo un 400
      if (cart === undefined || product === undefined) {
        res
          .status(400)
          .send({ status: "client error", error: "Parametros incorrectos" });
      } else {
        // si encuentro cart y la quantity esta definido busco los prods del cart
        let products = cart.products ?? [];
        // checkeo que este en la cart el producto con el id pid
        const inCart = products?.some((prod) => prod.product == pid);

        // si existe el producto modifico con un map el producto
        if (inCart) {
          products = products.map((prod) => {
            if (prod.product == pid) {
              return { ...prod, quantity: prod.quantity + 1 };
            }
            return prod;
          });
        } else {
          // si no existe al array de productos el producto
          products.push({ product: pid, quantity: 1 });
        }
        // grabo en el cart manager el carrito actualizado
        await cartDao.updateOne(cid, { products });
        // devuelvo status con el cart como payload
        res.status(201).send({ status: "success", payload: { products } });
      }
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
      const cart = await cartDao.getOne(cid);
      if (cart === undefined) {
        res
          .status(400)
          .send({ status: "client error", error: "Parametros incorrectos" });
      } else {
        let products = cart.products;
        // filtro el array products para eliminar el elemento que tenga el id === pid
        products = products.filter((prod) => prod.product !== pid);
        await cartDao.updateOne(cid, { products });
        res.status(200).send({ status: "success", payload: { products } });
      }
    } catch (error) {
      // si tengo un error al grabar o leer devuelvo un 500
      res.status(500).send({ status: "server error", error: error.message });
    }
  });

export default router;
