import { promises as fs } from "fs";

class ItemManager {
  constructor(filePath) {
    this.filePath = filePath;
  }
  async #save(items) {
    const data = JSON.stringify(items, null, 2);
    await fs.writeFile(this.filePath, data);
  }

  async getAll() {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      const items = JSON.parse(data);
      return items;
    } catch (error) {
      if (error.code === "ENOENT") return [];
      throw error;
    }
  }

  async getById(id) {
    const items = await this.getAll();
    return items.find((item) => item.id == id);
  }

  async createOne(item) {
    const items = await this.getAll();
    const id = items.length > 0 ? items[items.length - 1].id + 1 : 1;
    item = { ...item, id };
    items.push(item);
    await this.#save(items);
    return item;
  }

  async updateOne(id, itemData) {
    let items = await this.getAll();
    items = items.map((item) => {
      if (item.id == id) return { ...item, ...itemData };
      return item;
    });
    await this.#save(items);
  }

  async deleteOne(id) {
    let items = await this.getAll();
    items = items.filter((item) => item.id != id);
    await this.#save(items);
  }
}

export default ItemManager;
