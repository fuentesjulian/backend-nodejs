import productDao from "../dao/Products.DAO.js";
// import io de sockets, el unico agregado es la funcion emitProducts
import { io } from "../server.js";

class ProductService {
  constructor(productDao) {
    this.productDao = productDao;
  }

  async getAll() {
    return await this.productDao.getAll();
  }

  async getOne(pid) {
    return await this.productDao.getOne(pid);
  }

  async createOne(productData) {
    const allProducts = await this.productDao.getAll();
    const isDuplicate = allProducts.some(
      (prod) => prod.code == productData.code
    );
    if (isDuplicate) {
      throw new Error("client-codigo duplicado");
    } else {
      // creo un nuevo producto
      const product = await this.productDao.createOne(productData);
      // envio el producto creado
      return product;
    }
  }

  async updateOne(pid, productData) {
    const product = await productDao.updateOne(pid, productData);
    return product;
  }

  async deleteOne(pid) {
    await this.productDao.deleteOne(pid);
  }
}

const productService = new ProductService(productDao);

export default productService;
