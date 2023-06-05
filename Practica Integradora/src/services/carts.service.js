import cartDao from "../dao/Carts.DAO.js";
import productDao from "../dao/Products.DAO.js";

class CartService {
  constructor(cartDao, productDao) {
    this.cartDao = cartDao;
    this.productDao = productDao;
  }

  async new() {
    const cartData = { products: [] };
    const cart = await this.cartDao.createOne(cartData);
    return cart;
  }

  async getOne(cid) {
    const cart = await this.cartDao.getOne(cid);
    return cart;
  }

  async set(cid, pid) {
    // obtengo por id el cart y el producto
    const cart = await this.cartDao.getOne(cid);
    const product = await this.productDao.getOne(pid);
    console.log(cart);
    console.log(product);
    // si no existe un cart o la cantidad no esta setteada devuelvo un 400
    if (cart === undefined || product === undefined) {
      throw new Error("user-faltan parametros");
    } else {
      // si encuentro cart y la quantity esta definido busco los prods del cart
      let products = cart.products ?? [];
      console.log(cart);
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
      await this.cartDao.updateOne(cid, { products });
    }
  }

  async delete(cid, pid) {
    const cart = await cartDao.getOne(cid);
    if (cart === undefined) {
      throw new Error("user-parametros incorrectos");
    } else {
      let products = cart.products;
      // filtro el array products para eliminar el elemento que tenga el id === pid
      products = products.filter((prod) => prod.product !== pid);
      await this.cartDao.updateOne(cid, { products });
      res.status(200).send({ status: "success", payload: { products } });
    }
  }
}

const cartService = new CartService(cartDao, productDao);

export default cartService;
