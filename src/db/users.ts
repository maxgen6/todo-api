import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  auth: {
    password: { type: String, required: false, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  }
});

export const UserModel = mongoose.model('User', UserSchema)

export const getUserById = (id: string) => UserModel.findById(id)
export const getUserByEmail = (email: string) => UserModel.findOne({ email })
export const getUserBySessionToken = (token: string) => UserModel.findOne({
  'auth.sessionToken': token
})
export const createUser = (values: Record<string, any>) => new UserModel(values)
  .save().then(user => user.toObject())
