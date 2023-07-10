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

exports.getFunctionWithFilters = async function (query, page, limit) {
    let options = {
        page,
        limit
    };
    // Try Catch the awaited promise to handle the error
    try {
        console.log("Query", query);

        // Filtrar por las claves que no son "distance"
        let filters = [];
        for (let key in query) {
            if (key !== "distance") {
                let filter = {};
                filter[key] = query[key];
                filters.push(filter);
            }
        }
        let finalQuery = { $and: filters };

        console.log("finalQuery", finalQuery);

        // Realizar la búsqueda con los filtros iniciales
        let Functions = await Function.paginate(finalQuery, options);

        // Calcular la distancia utilizando latitud y longitud de los cines
        let lat1 = query.distance.lat;
        let lon1 = query.distance.long;
        let distanceRange = query.distance.range;
        let minDistance, maxDistance;

        // Extraer los límites del rango de distancia
        if (distanceRange) {
            const rangeValues = distanceRange.split("-");

            if (rangeValues.length === 2) {
                minDistance = parseFloat(rangeValues[0]);
                maxDistance = parseFloat(rangeValues[1]);
            } else if (rangeValues[0].startsWith("+")) {
                minDistance = parseFloat(rangeValues[0].substring(1));
            } else {
                maxDistance = parseFloat(rangeValues[0]);
            }
        }

        let filteredFunctions = Functions.docs.filter((func) => {
            let lat2 = func.cinema.location.lat;
            let lon2 = func.cinema.location.long;
            let distance = calculateDistance(lat1, lon1, lat2, lon2);

            if (minDistance && distance < minDistance) {
                return false;
            }
            if (maxDistance && distance > maxDistance) {
                return false;
            }

            return true;
        });

        // Actualizar las funciones filtradas
        Functions.docs = filteredFunctions;

        // Return the Functiond list that was returned by the mongoose promise
        return Functions;
    } catch (e) {
        // return a Error message describing the reason
        console.log("error services", e);
        throw Error("Error while Paginating Functions");
    }
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en kilómetros

    const degToRad = (degrees) => {
        return degrees * (Math.PI / 180);
    };

    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
};

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
