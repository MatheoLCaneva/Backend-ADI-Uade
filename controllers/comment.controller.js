let Commentservice = require('../services/comment.service');
// Saving the context of this module inside the _the letiable
let _this = this;

// Async Controller function to get the To do List
exports.getComments = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let page = req.query.page ? req.query.page : 1
    let limit = req.query.limit ? req.query.limit : 20;
    try {
        let Comments = await Commentservice.getComments({}, page, limit)
        // Return the Comments list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, Comments: Comments, message: "Succesfully Comments Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getCommentsByUser = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let page = req.query.page ? req.query.page : 1
    let limit = req.query.limit ? req.query.limit : 10;
    let filtro = { 'user.email': req.params.email, 'movie.id': req.params.movie }
    try {
        let Comments = await Commentservice.getComments(filtro, page, limit)
        // Return the Comments list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Comments, message: "Succesfully Comments Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createComment = async function (req, res) {
    // Req.Body contains the form submit values.
    let Comment = {
        user: req.body.user,
        movie: req.body.movie,
        cinema: req.body.cinema,
        comment: req.body.comment,
    }

    try {
        // Calling the Service function with the new object from the Request Body
        let createdComment = await Commentservice.createComment(Comment)
        return res.status(201).json({ status: 201, created: createdComment, message: "Succesfully Created Comment" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({ status: 400, message: "Comment Creation was Unsuccesfull" })
    }
}

exports.updateComment = async function (req, res, next) {


    let Comment = req.body
    try {
        let updatedComment = await Commentservice.updateComment(Comment)
        return res.status(200).json({ status: 200, Comment: updatedComment, message: "Succesfully Updated Comment" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}

// exports.removeComment = async function (req, res, next) {

//     let _id = req.params.id;
//     try {
//         let deleted = await Commentservice.deleteComment(_id);
//         res.status(200).send({ deleted, status: 200, message: "Succesfully Deleted... " });
//     } catch (e) {
//         return res.status(400).json({ status: 400, message: e.message })
//     }
// }


