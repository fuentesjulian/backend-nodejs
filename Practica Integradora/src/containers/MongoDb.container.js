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
    const allProds = asPOJO(data);
    allProds.map((prod) => replace(prod, "_id", "id"));
    return allProds;
  }

  // uso getAll y filtro por id
  async getOne(id) {
    return await this.model.find({ _id: id });
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
