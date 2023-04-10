let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate')


let CinemaSchema = new mongoose.Schema({
    name: String,
    owner: String,
    address: Object,
    location: Object,
    price: Number,
    movies: Object,
    status: Boolean,
    seats: Object
})

CinemaSchema.plugin(mongoosePaginate)
const Cinema = mongoose.model('Cinema', CinemaSchema, "cinemas")

module.exports = Cinema; 