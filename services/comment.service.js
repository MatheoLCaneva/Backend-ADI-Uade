// Gettign the Newly created Mongoose Model we just created 
let Comment = require('../models/Comment.model');
// let Class = require('../models/Class.model')
// Saving the context of this module inside the _the letiable
let _this = this

// Async function to get the Comment List
exports.getComments = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    let options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        let Comments = await Comment.paginate(query, options)
        // Return the Functiond list that was retured by the mongoose promise
        return Comments;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services", e)
        throw Error('Error while Paginating Comments');
    }
}


exports.createComment = async function (comment) {
    // Creating a new Mongoose Object by using the new keyword
    let newComment;

    newComment = new Comment({
        user: comment.user,
        movie: comment.movie,
        cinema: comment.cinema,
        comment: comment.comment
    })

    try {
        // Saving the Comment 
        let savedComment = await newComment.save();
        return savedComment;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)
        throw Error("Error while Creating Comment")
    }
}

exports.updateComment = async function (comment) {

    let _id = { _id: comment._id }
    try {
        //Find the old Comment Object by the Id
        let savedComment = await Comment.findOneAndReplace(_id, comment);
        return savedComment
    } catch (e) {
        throw Error("Error occured while Finding the Comment")
    }
}

exports.deleteComment = async function (_id) {

    // Delete the Comment
    try {
        let deleted = await Comment.findOneAndRemove({
            _id: _id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Comment Could not be deleted")
        }
        return deleted;
    } catch (e) {
        console.log(e)
        throw Error("Error Occured while Deleting the Comment")
    }
}
