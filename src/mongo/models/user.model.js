import mongoose from 'mongoose';

const UserModel = mongoose.model('User',
  new mongoose.Schema({
    email: String,
    password: String,
  })
);

export default UserModel;
