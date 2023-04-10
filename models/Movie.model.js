let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate')


let MovieSchema = new mongoose.Schema({
    title: String,
    image: String,
    genre: String,
    synopsis: String,
    rating: Number,
    releaseDate: Date,
})

MovieSchema.plugin(mongoosePaginate)
const Movie = mongoose.model('Movie', MovieSchema, "movies")

module.exports = Movie; 