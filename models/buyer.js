const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const buyerSchema = new Schema({
  email: String,
  name: String,
  password: String,
  bids: Array,
  favorites: Array
}, {
  timestamps: true
});
   
const Buyer = mongoose.model("Buyer", buyerSchema);

module.exports = Buyer;
