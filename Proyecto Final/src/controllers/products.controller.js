import CustomError from "../utils/CustomError.utils.js";
import productService from "../services/products.service.js";


// misma logica que el carts controller, uso en error handler de middleware al final
// por eso todos los errores catcheados van a next

export const getAll = async (req, res, next) => {
  try {
    const sort = req.query.sort;
    const limit = req.query.limit;
    const page = req.query.page;
    const category = req.query.category;
    const stock = req.query.stock;
    const response = await productService.getAll(sort, limit, page, category, stock);
    res.status(200).send({ status: "success", ...response });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const pid = req.params.pid;
    const product = await productService.getById(pid);
    res.status(200).send({ status: "success", payload: product });
  } catch (error) {
    next(error);
  }
};

export const createOne = async (req, res, next) => {
  try {
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;
    if (title && description && code && price && stock && category) {
      const prodData = {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails,
      };
      const product = await productService.createOne(prodData);
      res.status(201).send({ status: "success", payload: product });
    } else {
      throw new CustomError(400, "Faltan parametros");
    }
  } catch (error) {
    next(error);
  }
};

export const updateOne = async (req, res, next) => {
  try {
    const pid = req.params.pid;
    const {
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
      status,
    } = req.body;
    if (title && description && code && price && stock && category) {
      let prodData = {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails: thumbnails ?? [],
      };
      // en este caso, si status es par de los campos, asumo que queremos editarlo y lo agrego
      // ejemplo: quiero quitar de los publicados el producto, lo pongo en false
      if (status !== undefined) prodData = { ...prodData, status };
      const product = await productService.updateOne(pid, prodData);
      res.status(200).send({ status: "success", payload: product });
    } else {
      throw new CustomError(400, "Faltan parametros");
    }
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (req, res, next) => {
  try {
    const pid = req.params.pid;
    await productService.deleteOne(pid);
    res
      .status(200)
      .send({ status: "success", payload: `producto id ${pid} eliminado` });
  } catch (error) {
    next(error);
  }
};
