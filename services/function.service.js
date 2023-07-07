// Gettign the Newly created Mongoose Model we just created 
let Function = require('../models/function.model');
let Movie = require('../models/Movie.model')
let Room = require('../models/Room.model')
// let Class = require('../models/Class.model')
// Saving the context of this module inside the _the letiable
let _this = this

// Async function to get the Function List
exports.getFunctions = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    let options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query", query)
        let Functions = await Function.paginate(query, options)
        console.log(Functions)
        // Return the Functiond list that was retured by the mongoose promise
        return Functions;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services", e)
        throw Error('Error while Paginating Functions');
    }
}

exports.createFunction = async function (funcion) {
    // Creating a new Mongoose Object by using the new keyword
    let newFunction;
    let movie;
    let room;
    let seats;
    try {
        movie = await Movie.findById(funcion.movie)
    } catch (e) {
        throw Error('Error')
    }

    try {
        room = await Room.findById(funcion.room.id)
    }
    catch (e) {
        throw Error('Error al buscar room')
    }

    seats = room.seats

    newFunction = new Function({
        cinema: funcion.cinema,
        room: funcion.room,
        movie: movie,
        date: funcion.date,
        hour: funcion.hour,
        seats: seats
    })

    try {
        // Saving the Function 
        let savedFunction = await newFunction.save();
        return savedFunction;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)
        throw Error("Error while Creating Function")
    }
}

exports.updateFunction = async function (funcion) {

    let _id = { _id: funcion._id }
    try {
        //Find the old Function Object by the Id
        let savedFunction = await Function.findOneAndUpdate(_id, funcion);
        return savedFunction
    } catch (e) {
        throw Error("Error occured while Finding the Function")
    }
}

exports.deleteFunction = async function (_id) {

    // Delete the Function
    try {
        let deleted = await Function.findOneAndRemove({
            _id: _id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Function Could not be deleted")
        }
        return deleted;
    } catch (e) {
        console.log(e)
        throw Error("Error Occured while Deleting the Function")
    }
}
