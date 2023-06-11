import productService from "../services/products.service.js";
import cartsService from "../services/carts.service.js";

import asPOJO from "../utils/asPOJO.utils.js";

export const home = (req, res) => {};
export const getAllProducts = async (req, res) => {
  const query = req.query.query;
  const sort = req.query.sort;
  const limit = req.query.limit;
  const page = req.query.page;
  const response = await productService.getAll(query, sort, limit, page);
  const respObj = asPOJO(response);
  res.render("products", { response: respObj });
};
export const getOneProduct = async (req, res) => {
  const pid = req.params.pid;
  const response = await productService.getById(pid);
  const prod = asPOJO(response);
  res.render("product", { ...prod });
};
export const getOneCart = async (req, res) => {
  const cid = req.params.cid;
  const response = await cartsService.getCart(cid);
  const cartData = await response.populate("products.product")
  const cart = asPOJO(cartData);
  res.render("cart", { cart });
};
export const createOneProduct = async (req, res) => {
  res.render("new");
};
export const notFound = (req, res) => {};
