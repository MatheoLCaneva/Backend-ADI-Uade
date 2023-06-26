let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate')


let FunctionSchema = new mongoose.Schema({
    cinema: String,
    room: String,
    movie: String,
    date: Date,
    hour: Date,
})

FunctionSchema.plugin(mongoosePaginate)
const Function = mongoose.model('Function', FunctionSchema, "functions")

module.exports = Function; 