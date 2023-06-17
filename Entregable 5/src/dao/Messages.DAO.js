import FileSystemContainer from "../containers/FileSystem.container.js";
import MongoDbContainer from "../containers/MongoDb.container.js";
import Messages from "./models/Messages.js";
let messagesDao;

const CONTAINER = "MONGO";

switch (CONTAINER) {
  case "MONGO":
    messagesDao = new MongoDbContainer(Messages);
    break;
  case "FS":
    messagesDao = new FileSystemContainer("./src/database/messages.json");
    break;
  default:
    messagesDao = new MongoDbContainer(Messages);
    break;
}

export default messagesDao;
