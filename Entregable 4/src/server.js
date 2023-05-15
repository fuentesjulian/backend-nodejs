// importo socket.io
import { Server } from "socket.io";
// importo app
import app from "./app.js";

// creo el webserver
const webServer = app.listen(8080, () => {
  console.log("Escuchando en puerto 8080");
});

// creo io
const io = new Server(webServer);

// importo el productsManager
import productsManager from "./database/ProductManager.js";

// cada vez que conecta mando los productos
io.on("connection", async (socket) => {
  console.log("Cliente conectado")
  const products = await productsManager.getAll();
  socket.emit("products", products);
});

// exporto io, lo voy a usar para el products router (con PUT, DELETE y POST)
export { io };
