import FileSystemContainer from "../containers/FileSystem.container.js";
import MongoDbContainer from "../containers/MongoDb.container.js";
import Cart from "./models/Cart.js";
let cartDao;

const CONTAINER = "MONGO";

switch (CONTAINER) {
  case "MONGO":
    cartDao = new MongoDbContainer(Cart);
    break;
  case "FS":
    cartDao = new FileSystemContainer("./src/database/carrito.json");
    break;
  default:
    cartDao = new MongoDbContainer(Cart);
    break;
}

export default cartDao;
