const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const workSchema = new Schema({
    title: String, 
    artist: { type: Schema.Types.ObjectId, ref: 'Artist'},
    description: String,
    bids: Number,//[{bid: Number, buyer:{name: String}}], 
    buyer: String,
    //[{amount: Number, 
    //        buyer: { type: Schema.Types.ObjectId, ref: 'Buyer'}}],
    theme: String,
    date: Date,
    image: String
})

const Work = mongoose.model("Work", workSchema)

module.exports = Work