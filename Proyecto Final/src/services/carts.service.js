import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import CustomError from "../utils/CustomError.utils.js";

class CartsService {
  constructor() {
    this.Cart = Cart;
    this.Product = Product;
  }

  async createCart() {
    const cart = await this.Cart.create({});
    return cart;
  }

  async getCart(cid) {
    const isValid = mongoose.Types.ObjectId.isValid(cid);
    if (!isValid) throw new CustomError(400, "Parametros invalidos");
    const cart = await this.Cart.findById(cid);
    if (!cart) throw new CustomError(400, "No existe el carrito");
    return cart;
  }

  async #validateProduct(pid) {
    const isValid = mongoose.Types.ObjectId.isValid(pid);
    if (!isValid) throw new CustomError(400, "Parametros invalidos");
    const product = await this.Product.findById(pid);
    if (!product) throw new CustomError(400, "No existe el producto");
  }

  async #validateProdObj(prod) {
    // si no existe el campo product es invalido
    if (!prod.product) return false;
    // si no existe el campo quantity es invalido
    if (!prod.quantity) return false;
    // si la cantidad no es un numero es invalido
    if (isNaN(prod.quantity)) return false;
    // si el ID no es un ID de mongo es invalido
    const isValid = mongoose.Types.ObjectId.isValid(prod.product);
    if (!isValid) return false;
    // si el producto no existe es invalido
    const product = await this.Product.findById(prod.product);
    if (!product) return false;
    return true;
  }

  async addProduct(cid, pid) {
    const cart = await this.getCart(cid);
    await this.#validateProduct(pid);
    let products = cart.products;
    const inCart = products.some((prod) => prod.product.toString() === pid);
    if (inCart) {
      products = products.map((prod) => {
        if (prod.product.toString() == pid) {
          return { ...prod, quantity: prod.quantity + 1 };
        }
        return prod;
      });
    } else {
      products.push({ product: pid, quantity: 1 });
    }
    cart.products = products;
    await cart.save();
    return cart;
  }

  async removeProduct(cid, pid) {
    const cart = await this.getCart(cid);
    let products = cart.products;
    cart.products = products.filter((prod) => prod.product.toString() != pid);
    await cart.save();
    return cart;
  }

  async updateCart(cid, products) {
    const cart = await this.getCart(cid);
    let isCartValid = true;
    await products.forEach(async (prod) => {
      const isProdValid = await this.#validateProdObj(prod);
      if (!isProdValid) isCartValid = false;
    });
    if (!isCartValid) throw new CustomError(400, "Parametros invalidos");
    cart.products = products;
    await cart.save();
    return cart;
  }

  async updateProduct(cid, pid, quantity) {
    const cart = await this.getCart(cid);
    await this.#validateProduct(pid);
    let products = cart.products;
    const inCart = products.some((prod) => prod.product.toString() === pid);
    if (inCart) {
      products = products.map((prod) => {
        if (prod.product.toString() == pid) {
          return { ...prod, quantity: quantity };
        }
        return prod;
      });
    } else {
      products.push({ product: pid, quantity: quantity });
    }
    cart.products = products;
    await cart.save();
    return cart;
  }

  async clearCart(cid) {
    const cart = await this.getCart(cid);
    cart.products = [];
    await cart.save();
    return cart;
  }
}

const cartsService = new CartsService();

export default cartsService;
