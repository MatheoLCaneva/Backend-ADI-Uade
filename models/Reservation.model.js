let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate')


let ReservationSchema = new mongoose.Schema({
    user: Object,
    cinema: Object,
    movie: Object,
    room: Object,
    date: String,
    hour: String,
    seats: Array,
    totalPrice: Number
})

ReservationSchema.plugin(mongoosePaginate)
const Reservation = mongoose.model('Reservation', ReservationSchema, "reservations")

module.exports = Reservation; 