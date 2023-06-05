// importo socket.io
import { Server } from "socket.io";
// importo app
import app from "./app.js";
// importo mongoose
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

// creo el webserver
const webServer = app.listen(8080, () => {
  console.log("Escuchando en puerto 8080");
});

// creo io
const io = new Server(webServer);

// importo el productsManager
import productsManager from "./database/ProductManager.js";
import productDao from "./dao/Products.DAO.js";
import messagesDao from "./dao/Messages.DAO.js";

// cada vez que conecta mando los productos
io.on("connection", async (socket) => {
  console.log("Cliente conectado");
  const products = await productDao.getAll();
  const messages = await messagesDao.getAll();
  socket.emit("products", products);
  socket.emit("messages", messages);
});

// exporto io, lo voy a usar para el products router (con PUT, DELETE y POST)
export { io };
