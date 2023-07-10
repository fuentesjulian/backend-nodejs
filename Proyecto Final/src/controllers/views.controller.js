import productService from "../services/products.service.js";
import cartsService from "../services/carts.service.js";

import asPOJO from "../utils/asPOJO.utils.js";

// creo una funcion auxiliar
const getUser = (req) => {
  if (!req.user) return false;
  let user = asPOJO(req.user);
  delete user.password;
  delete user.__v;
  return user;
};
export const home = async (req, res) => {
  const user = getUser(req);
  res.render("home", { user });
};

export const getAllProducts = async (req, res) => {
  const user = getUser(req);
  const sort = req.query.sort;
  const limit = req.query.limit;
  const page = req.query.page;
  const category = req.query.category;
  const stock = req.query.stock;
  const response = await productService.getAll(
    sort,
    limit,
    page,
    category,
    stock
  );
  const respObj = asPOJO(response);
  res.render("products", { response: respObj, user });
};
export const getOneProduct = async (req, res) => {
  const user = getUser(req);
  try {
    const pid = req.params.pid;
    const response = await productService.getById(pid);
    const prod = asPOJO(response);
    res.render("product", { ...prod, user });
  } catch (error) {
    res.render("notfound");
  }
};
export const getOneCart = async (req, res) => {
  const user = getUser(req);
  try {
    const cid = req.params.cid;
    const response = await cartsService.getCart(cid);
    const cartData = await response.populate("products.product");
    const cart = asPOJO(cartData);
    res.render("cart", { cart, user });
  } catch (error) {
    res.render("notfound");
  }
};
export const createOneProduct = async (req, res) => {
  const user = getUser(req);
  res.render("new", { user });
};

export const register = async (req, res) => {
  res.render("register");
};

export const login = async (req, res) => {
  res.render("login");
};

export const notFound = (req, res) => {
  const user = getUser(req);
  res.render("notfound", { user });
};
