import FileSystemContainer from "../containers/FileSystem.container.js";
import MongoDbContainer from "../containers/MongoDb.container.js";
import Product from "./models/Product.js";
let productDao;

const CONTAINER = "MONGO";

switch (CONTAINER) {
  case "MONGO":
    productDao = new MongoDbContainer(Product);
    break;
  case "FS":
    productDao = new FileSystemContainer("./src/database/productos.json");
    break;
  default:
    productDao = new MongoDbContainer(Product);
    break;
}

export default productDao;
