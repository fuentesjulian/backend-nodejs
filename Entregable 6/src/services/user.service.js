import User from "../dao/models/User.js";

class UserService {
  constructor() {
    this.model = User;
  }
  async getAll() {
    return await this.model.find();
  }
  async getByEmail(email) {
    return await this.model.findOne({ email });
  }

  async getById(id) {
    return await this.model.findById(id);
  }

  async createUser(userData) {
    const userExists = await this.model.findOne({ email: userData.email });
    if (userExists) throw new Error("user already exists");
    return await this.model.create(userData);
  }
}

const userService = new UserService();
export default userService;
