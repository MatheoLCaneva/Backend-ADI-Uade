let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate')


let FunctionSchema = new mongoose.Schema({
    cinema: Object,
    room: Object,
    movie: Object,
    date: String,
    hour: String,
    seats: Array,
})

FunctionSchema.plugin(mongoosePaginate)
const Function = mongoose.model('Function', FunctionSchema, "functions")

module.exports = Function; 