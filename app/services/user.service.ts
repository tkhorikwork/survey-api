import User from "../models/User";
import { ObjectId } from "mongodb";

export const createUser = async (payload: { [key: string]: string | number | boolean }): Promise<any> => {
  const newUser = new User(payload);
  newUser._id = new ObjectId();
  newUser.hash = "33rhfubcno30238nbcvSSEDf"; // TODO -> add reacl user auth flow

  return await newUser.save();
};
