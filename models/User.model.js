let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate')


let UserSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    password: String,
    rol: String,
    imgUser: String
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema, "users")

module.exports = User; 