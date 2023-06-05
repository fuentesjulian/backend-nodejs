import replace from "../utils/replace.utils.js";
import asPOJO from "../utils/asPOJO.utils.js";

class MongoDbContainer {
  // el constructor recibe el modelo
  constructor(model) {
    this.model = model;
  }

  // leo todos los registros y los devuelvo
  async getAll() {
    const data = await this.model.find();
    let allItems = asPOJO(data);
    allItems.map((prod) => replace(prod, "_id", "id"));
    return allItems;
  }

  // uso getAll y filtro por id
  async getOne(id) {
    const data = await this.model.findOne({ _id: id });
    let product = asPOJO(data);
    product = replace(product, "_id", "id");
    return product;
  }

  // creo a un item nuevo
  async createOne(item) {
    return await this.model.create(item);
  }

  async updateOne(id, itemData) {
    await this.model.updateOne({ _id: id }, itemData);
    return this.getOne(id);
  }

  async deleteOne(id) {
    return await this.model.deleteOne({ _id: id });
  }
}

export default MongoDbContainer;
