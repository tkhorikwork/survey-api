const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const surveySchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    refPath: "onModel",
  },
  onModel: {
    type: String,
    enum: ["Question"],
  },
  createdAt: { type: Date, default: Date.now },
  title: { type: String, required: true },
  image_url: { type: String, required: true },
  active: { type: Boolean, default: true, required: true },

  createdBy: { type: Schema.ObjectId, ref: "User", required: true },
  questions: [{ type: Schema.ObjectId, ref: "Question" }],
});

const Survey = mongoose.model("Survey", surveySchema);
export default Survey;
