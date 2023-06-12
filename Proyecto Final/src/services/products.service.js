import mongoose from "mongoose";
import Product from "../models/Product.js";
import CustomError from "../utils/CustomError.utils.js";
import isJSON from "../utils/isJSON.utils.js";
import asPOJO from "../utils/asPOJO.utils.js";
import replace from "../utils/replace.utils.js";

class ProductService {
  constructor() {
    this.Product = Product;
  }

  async getAll(query, sort, limit, page) {
    // si no esta definido limit, pongo 10
    // si esta definido, checkeo si es un numero
    // si no es un numero, pongo 10
    // si es numero, va el numero
    limit = limit ? (isNaN(limit ?? 10) ? 10 : limit) : 10;
    // misma logica con la query
    page = page ? (isNaN(page ?? 1) ? 1 : page) : 1;
    // sort puede valer "asc" o "desc" si pasan otro valor no ordena
    sort = sort === "asc" ? 1 : sort === "desc" ? -1 : null;
    // transformo la query a un json
    if (query) {
      if (!isJSON(query)) throw new CustomError(400, "Parametros invalidos");
      query = JSON.parse(query);
    }

    let prodData = await this.Product.paginate(query, {
      limit: limit,
      page: page,
      sort: sort ? { price: sort } : false,
    });
    prodData = replace(prodData, "docs", "payload");
    let pagelink = `?limit=${limit}`;
    let limitlink = `?`;
    let sortlink = `?limit=${limit}`;
    let querylink = `?limit=${limit}`;
    if (sort) {
      const sortStr = `&sort=${sort === 1 ? "asc" : "desc"}`;
      pagelink += sortStr;
      limitlink += sortStr;
      querylink += sortStr;
    }
    if (query) {
      const queryString = `&query=${JSON.stringify(query)}`;
      pagelink += queryString;
      limitlink += queryString;
      sortlink += queryString;
    }
    if (prodData.hasPrevPage)
      prodData.prevLink = pagelink + `&page=${prodData.page - 1}`;
    if (prodData.hasNextPage)
      prodData.nextLink = pagelink + `&page=${prodData.page + 1}`;

    prodData.limitLink = limitlink;
    prodData.sortLink = sortlink;
    prodData.queryLink = querylink;
    prodData.pageLink = pagelink;
    return prodData;
  }
  async getById(id) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new CustomError(400, "Parametros invalidos");
    const product = await this.Product.findById(id);
    if (!product) throw new CustomError(400, "No existe el producto");
    return product;
  }

  async createOne(prodData) {
    const { code } = prodData;
    const isDuplicate = await this.Product.findOne({ code });
    if (isDuplicate) throw new CustomError(400, "Codigo duplicado");
    const product = await this.Product.create(prodData);
    return product;
  }
  async updateOne(id, prodData) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new CustomError(400, "Parametros invalidos");
    const prod = await this.Product.findById(id);
    if (!prod) throw new CustomError(400, "No existe el producto");
    await this.Product.updateOne({ _id: id }, prodData);
    const product = { ...asPOJO(prod), ...prodData };
    return product;
  }
  async deleteOne(id) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new CustomError(400, "Parametros invalidos");
    await this.Product.deleteOne({ _id: id });
  }
}

const productService = new ProductService();

export default productService;
