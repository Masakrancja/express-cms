const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Tytuł nie może być pusty"] },
  description: { type: String, required: [true, "Opis nie może być pusty"] },
  created: { type: Date, default: Date.now },
});
module.exports = mongoose.model("News", newsSchema);
