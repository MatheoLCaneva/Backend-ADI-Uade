let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate')


let RoomSchema = new mongoose.Schema({
    name: String,
    owner: String,
    cinema: String,
    price: Number,
    status: Boolean,
    seats: Array
})

RoomSchema.plugin(mongoosePaginate)
const Room = mongoose.model('Room', RoomSchema, "rooms")

module.exports = Room; 