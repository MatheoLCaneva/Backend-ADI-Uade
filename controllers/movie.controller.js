let MovieService = require('../services/movie.service');
// Saving the context of this module inside the _the letiable
let _this = this;

// Async Controller function to get the To do List
exports.getMovies = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let page = req.query.page ? req.query.page : 1
    console.log(page)
    let limit = req.query.limit ? req.query.limit : 20;
    try {
        let movies = await MovieService.getMovies({}, page, limit)
        // Return the movies list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, movies: movies, message: "Succesfully Movies Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.getMovieById = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let page = req.query.page ? req.query.page : 1
    let limit = req.query.limit ? req.query.limit : 10;
    let filtro = { _id: req.params.id }
    try {
        let movies = await MovieService.getMovies(filtro, page, limit)
        // Return the Movies list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: movies, message: "Succesfully Movies Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createMovie = async function (req, res) {
    // Req.Body contains the form submit values.
    let Movie = {
        title: req.body.title,
        image: req.body.image,
        genre: req.body.genre,
        synopsis: req.body.synopsis,
        releaseDate: req.body.releaseDate,
        duration: req.body.duration
    }
    try {
        // Calling the Service function with the new object from the Request Body
        let createdMovie = await MovieService.createMovie(Movie)
        console.log(createdMovie)
        return res.status(201).json({ status: 201, createdMovie, message: "Succesfully Created Movie" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({ status: 400, message: "Movie Creation was Unsuccesfull" })
    }
}

exports.updateMovie = async function (req, res, next) {


    let Movie = req.body
    try {
        let updatedMovie = await MovieService.updateMovie(Movie)
        return res.status(200).json({ status: 200, movie: updatedMovie, message: "Succesfully Updated Movie" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}

exports.removeMovie = async function (req, res, next) {

    let _id = req.params.id;
    try {
        let deleted = await MovieService.deleteMovie(_id);
        res.status(200).send({ deleted, status: 200, message: "Succesfully Deleted... " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}


