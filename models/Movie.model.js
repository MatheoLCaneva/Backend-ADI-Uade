let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate')


let MovieSchema = new mongoose.Schema({
    title: String,
    image: String,
    genre: Array,
    synopsis: String,
    rating: Number,
    cantRating:Number,
    releaseDate: String
})

MovieSchema.plugin(mongoosePaginate)
const Movie = mongoose.model('Movie', MovieSchema, "movies")

module.exports = Movie; 