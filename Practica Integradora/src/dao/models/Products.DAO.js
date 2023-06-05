import FileSystemContainer from "../../containers/FileSystem.container.js";

const productDao = new FileSystemContainer("./src/database/productos.json");

export default productDao;
