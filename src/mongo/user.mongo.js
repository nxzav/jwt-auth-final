import UserModel from './models/user.model.js';

class User {
  getUsers = async () => await UserModel.find();
  getUserById = async (id) => await UserModel.findById(id);
  getUserByEmail = async (email) => await UserModel.findOne({ email: email });
  createUser = async (user) => await UserModel.create({ ...user });
}

const UserService = new User();
export default UserService;
