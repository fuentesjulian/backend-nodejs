// ItemManager es una clase generica que sirve para almacenar datos
// se usa tanto para productos como para carts

// importo fs.promises
import { promises as fs } from "fs";

class ItemManager {
  // el constructor recibe el filepath
  constructor(filePath) {
    this.filePath = filePath;
  }

  // metodo privado para grabar, recibe el array de items para grabar
  async #save(items) {
    const data = JSON.stringify(items, null, 2);
    await fs.writeFile(this.filePath, data);
  }

  // leo todos los registros y los devuelvo
  async getAll() {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      const items = JSON.parse(data);
      return items;
    } catch (error) {
      // si el file no existe devuelve un array vacio
      if (error.code === "ENOENT") return [];
      // si es otro error tira el error
      throw error;
    }
  }

  // uso getAll y filtro por id
  async getById(id) {
    const items = await this.getAll();
    return items.find((item) => item.id == id);
  }

  // creo a un item nuevo
  async createOne(item) {
    // obtengo todos los items
    const items = await this.getAll();
    // creo el id
    const id = items.length > 0 ? items[items.length - 1].id + 1 : 1;
    // le agrego el id a mi item
    item = { ...item, id };
    // agrego mi item a la lista de items
    items.push(item);
    // grabo
    await this.#save(items);
    // devuelvo el item creado
    return item;
  }

  async updateOne(id, itemData) {
    console.log("itemData", itemData)
    // obtengo todos los items
    let items = await this.getAll();
    // con un map solo modifico el item que matchea con el id
    // si no hay match lo devuelvo igual a como estaba
    items = items.map((item) => {
      if (item.id == id) return { ...item, ...itemData };
      return item;
    });
    // grabo
    await this.#save(items);
  }

  async deleteOne(id) {
    let items = await this.getAll();
    // filtro para que me quede un nuevo array que excluya el id que le paso como parametro
    items = items.filter((item) => item.id != id);
    await this.#save(items);
  }
}

export default ItemManager;
