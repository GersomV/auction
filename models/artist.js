const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


const artistSchema = new Schema({
    name: String,
    password: String,
    personal: {
        firstName: String,
        lastName: String
    },
        rating: Number
    },
    {
        timestamps: true
    })

const Artist = mongoose.model("Artist", artistSchema)

module.exports = Artist

  