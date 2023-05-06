// importo el router de express
import { Router } from "express";
// importo el item manager
import ItemManager from "../database/ItemManager.js";

// creo mi router
const router = Router();
// instancio cartsManager y el productsManager con el path
const cartsManager = new ItemManager("./src/database/carrito.json");
const productsManager = new ItemManager("./src/database/productos.json");

router
  .post("/", async (req, res) => {
    // creo el array de productos vacio que por default voy a tener apenas creo el cart
    const cartData = { products: [] };
    try {
      // grabo el cart
      const cart = await cartsManager.createOne(cartData);
      // envio el cart grabado
      res.status(201).send(cart);
    } catch (error) {
      // si tengo un error para grabar, devuelvo un 500
      res.status(500).send({ error: error.message });
    }
  })
  .get("/:cid", async (req, res) => {
    // busco el id del cart
    const cid = req.params.cid;
    try {
      // leo el cart en la DB
      const cart = await cartsManager.getById(cid);
      if (cart) {
        // si existe cart devuelvo los productos (puede ser un array vacio [])
        const products = cart.products;
        res.status(200).send(products);
      } else {
        // si no existe un cart devuelvo un error 400, asumo que el usuario esta jugando con las rutas
        res.status(400).send({ error: "Parametros incorrectos" });
      }
    } catch (error) {
      // si hay un error para leer la DB devuelvo 500
      res.status(500).send({ error: error.message });
    }
  })
  .post("/:cid/product/:pid", async (req, res) => {
    // id del cart
    const cid = req.params.cid;
    // id del producto
    const pid = req.params.pid;
    try {
      // obtengo por id el cart y el producto
      const cart = await cartsManager.getById(cid);
      const product = await productsManager.getById(pid);
      // si no existe un cart o la cantidad no esta setteada devuelvo un 400
      if (cart === undefined || product === undefined) {
        res.status(400).send({ error: "Parametros incorrectos" });
      } else {
        // si encuentro cart y la quantity esta definido busco los prods del cart
        let products = cart.products;
        // checkeo que este en la cart el producto con el id pid
        const inCart = products.some((prod) => prod.product == pid);
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
        await cartsManager.updateOne(cid, { products });
        // devuelvo status
        res.status(201).send({ success: `Prod id ${pid} a cart ${cid}` });
      }
    } catch (error) {
      // si tengo un error en la bd devuelvo un 500
      res.status(500).send({ error: error.message });
    }
  })
  .delete("/:cid/product/:pid", async (req, res) => {
    // bonus: para eliminar productos del cart
    // misma logica que el put, checkeo que exista el cart
    // la diferencia es que en vez que agregar/modificar el array de products, la filtro
    const cid = req.params.cid;
    const pid = req.params.pid;
    try {
      const cart = await cartsManager.getById(cid);
      if (cart === undefined) {
        res.status(400).send({ error: "Parametros incorrectos" });
      } else {
        let products = cart.products;
        // filtro el array products para eliminar el elemento que tenga el id === pid
        products = products.filter((prod) => prod.product !== pid);
        await cartsManager.updateOne(cid, { products });
        res
          .status(200)
          .send({ success: `Eliminado el prod id ${pid} en el cart ${cid}` });
      }
    } catch (error) {
      // si tengo un error al grabar o leer devuelvo un 500
      res.status(500).send({ error: error.message });
    }
  });

export default router;
