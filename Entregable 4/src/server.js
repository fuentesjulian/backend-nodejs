import { Server } from "socket.io";
import app from "./app.js";

const webServer = app.listen(8080, () => {
  console.log("Escuchando en puerto 8080");
});

const io = new Server(webServer);

// importo el item manager
import productsManager from "./database/ProductManager.js";

io.on("connection", async (socket) => {
  const products = await productsManager.getAll();
  socket.emit("products", products);
});

export { io };
