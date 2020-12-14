const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    refPath: "onModel",
  },
  onModel: {
    type: String,
    enum: ["Survey", "Question", "Response"],
  },
  createdAt: { type: Date, default: Date.now },
  email: { type: String, required: true },
  hash: { type: String },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  role: { type: String, default: "admin" },
  avatar: { type: String, default: "" },
  active: { type: Boolean, default: true, required: true },
});

const User = mongoose.model("User", userSchema);
export default User;
