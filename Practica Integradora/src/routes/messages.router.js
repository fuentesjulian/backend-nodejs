// importo el router de express
import { Router } from "express";
// import io de sockets, el unico agregado es la funcion emitProducts
import { io } from "../server.js";
import messagesDao from "../dao/Messages.DAO.js";

const router = Router();

const emitChat = async () => {
  const messages = await messagesDao.getAll();
  io.emit("messages", messages);
};

router.post("/", async (req, res) => {
  const { user, message } = req.body;
  if (user && message) {
    try {
      const msg = await messagesDao.createOne({ user, message });
      emitChat();
      res.status(201).send({ status: "success", payload: { msg } });
    } catch (error) {
      // si hay un error al grabar me devuelve un status 500 con el error
      res.status(500).send({ status: "server error", error: error.message });
    }
  } else {
    // si falta un parametro envio error
    res
      .status(400)
      .send({ status: "client error", error: "Faltan parametros" });
  }
});

export default router;
