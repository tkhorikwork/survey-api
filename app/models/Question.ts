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

  questionType: { type: String, required: true, default: "text" },
  prefix: { type: String, default: null },
  suffix: { type: String, default: null },
  placeholder: { type: String },

  active: { type: Boolean, default: true, required: true },

  createdBy: { type: Schema.ObjectId, ref: "User" },
});

const Question = mongoose.model("Question", surveySchema);
export default Question;
