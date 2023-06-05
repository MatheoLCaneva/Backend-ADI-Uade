let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate')


let RoomSchema = new mongoose.Schema({
    name: String,
    owner: String,
    address: Object,
    location: Object,
    price: Number,
    movies: Array,
    status: Boolean,
    seats: Object
})

RoomSchema.plugin(mongoosePaginate)
const Room = mongoose.model('Room', RoomSchema, "rooms")

module.exports = Room; 