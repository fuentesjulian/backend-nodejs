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
    await this.#validateProduct(pid);
    let products = cart.products;
    cart.products = products.filter((prod) => prod.product.toString() != pid);
    await cart.save();
    return cart;
  }

  async updateCart(cid, products) {
    const cart = await this.getCart(cid);
    products.forEach(async (prod) => {
      const pid = prod.product;
      await this.#validateProduct(pid);
    });
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
      products.push({ product: pid, quantity: 1 });
    }
    cart.products = products;
    await cart.save();
    return cart;
  }

  async clearCart(cid) {
    const cart = this.getCart(cid);
    cart.products = [];
    await cart.save();
    return cart;
  }
  
}

const cartsService = new CartsService();

export default cartsService;
