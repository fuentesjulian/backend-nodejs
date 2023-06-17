import User from "../dao/models/User.js";

class UserService {
  constructor() {
    this.model = User;
  }
  async getAll() {
    return await this.model.find();
  }
  async geyByEmail(email) {
    return await this.model.findOne({ email });
  }
  async createUser(userData) {
    const userExists = await this.model.findOne({ email: userData.email });
    if (userExists) throw new Error("duplicate");
    return await this.model.create(userData);
  }
}

const userService = new UserService();
export default userService;
