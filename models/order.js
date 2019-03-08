const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


const orderSchema = new Schema({
    painting: { type: Schema.Types.ObjectId, ref: 'Work'},
    artist: { type: Schema.Types.ObjectId, ref: 'Artist'},
    buyer: { type: Schema.Types.ObjectId, ref: 'Buyer'},
    bid: Number
})

const Order = mongoose.Model('Order', orderSchema)
module.exports = Order

