let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate')


let CommentSchema = new mongoose.Schema({
    user: Object,
    movie: Object,
    comment: String
})

CommentSchema.plugin(mongoosePaginate)
const Comment = mongoose.model('Comment', CommentSchema, "comment")

module.exports = Comment; 