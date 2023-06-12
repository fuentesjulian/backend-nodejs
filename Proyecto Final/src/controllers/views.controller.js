import productService from "../services/products.service.js";
import cartsService from "../services/carts.service.js";

import asPOJO from "../utils/asPOJO.utils.js";

export const home = (req, res) => {};
export const getAllProducts = async (req, res) => {
  const sort = req.query.sort;
  const limit = req.query.limit;
  const page = req.query.page;
  const category = req.query.category;
  const stock = req.query.stock;
  const response = await productService.getAll(sort, limit, page, category, stock);
  const respObj = asPOJO(response);
  console.log(respObj)
  res.render("products", { response: respObj });
};
export const getOneProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const response = await productService.getById(pid);
    const prod = asPOJO(response);
    res.render("product", { ...prod });
  } catch (error) {
    res.render("notfound");
  }
};
export const getOneCart = async (req, res) => {
  try {
    const cid = req.params.cid;
    const response = await cartsService.getCart(cid);
    const cartData = await response.populate("products.product");
    const cart = asPOJO(cartData);
    res.render("cart", { cart });   
  } catch (error) {
    res.render("notfound")
  }

};
export const createOneProduct = async (req, res) => {
  res.render("new");
};
export const notFound = (req, res) => {
  res.render("notfound")
};
