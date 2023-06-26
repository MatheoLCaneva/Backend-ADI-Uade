let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate')


let FunctionSchema = new mongoose.Schema({
    cinema: String,
    room: String,
    movie: Object,
    date: String,
    hour: String,
})

FunctionSchema.plugin(mongoosePaginate)
const Function = mongoose.model('Function', FunctionSchema, "functions")

module.exports = Function; 