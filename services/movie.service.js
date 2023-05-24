// Gettign the Newly created Mongoose Model we just created 
let Movie = require('../models/Movie.model');
// let Class = require('../models/Class.model')
// Saving the context of this module inside the _the letiable
let _this = this

// Async function to get the Movie List
exports.getMovies = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    let options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query", query)
        let Movies = await Movie.paginate(query, options)
        // Return the Movied list that was retured by the mongoose promise
        return Movies;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services", e)
        throw Error('Error while Paginating Movies');
    }
}

exports.createMovie = async function (movie) {
    // Creating a new Mongoose Object by using the new keyword
    let newMovie;

    newMovie = new Movie({
        title: movie.title,
        image: movie.image,
        genre: movie.genre,
        synopsis: movie.synopsis,
        rating: 0,
        cantRating: 0,
        releaseDate: movie.releaseDate
    })

    try {
        // Saving the Movie 
        let savedMovie = await newMovie.save();
        return savedMovie;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)
        throw Error("Error while Creating Movie")
    }
}

exports.updateMovie = async function (Cine) {

    let _id = { _id: Cine._id }
    let oldMovie;
    try {
        //Find the old Movie Object by the Id
        oldMovie = await Movie.findOne(_id);
    } catch (e) {
        throw Error("Error occured while Finding the Movie")
    }
    // If no old Movie Object exists return false
    if (!oldMovie) {
        return false;
    }
    //Edit the Movie Object
    Object.keys(Cine).forEach(key => {
        oldMovie[key] = Cine[key];
    });

    try {
        let savedMovie = await oldMovie.save()
        return savedMovie;
    } catch (e) {
        throw Error("And Error occured while updating the Movie");
    }
}

exports.deleteMovie = async function (_id) {

    // Delete the Movie
    try {
        let deleted = await Movie.findOneAndRemove({
            _id: _id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Movie Could not be deleted")
        }
        return deleted;
    } catch (e) {
        console.log(e)
        throw Error("Error Occured while Deleting the Movie")
    }
}
