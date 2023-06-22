let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate')


let CinemaSchema = new mongoose.Schema({
    name: String,
    owner: String,
    address: Object,
    location: Object,
    rooms: Array
})

CinemaSchema.plugin(mongoosePaginate)
const Cinema = mongoose.model('Cinema', CinemaSchema, "cinemas")

module.exports = Cinema; 