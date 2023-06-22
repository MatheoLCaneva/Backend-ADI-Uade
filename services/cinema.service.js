// Gettign the Newly created Mongoose Model we just created 
let Cinema = require('../models/Cinema.model');
// let Class = require('../models/Class.model')
// Saving the context of this module inside the _the letiable
let _this = this

// Async function to get the Cinema List
exports.getCinemas = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    let options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query", query)
        let Cinemas = await Cinema.paginate(query, options)
        // Return the Cinemad list that was retured by the mongoose promise
        return Cinemas;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services", e)
        throw Error('Error while Paginating Cinemas');
    }
}

exports.createCinema = async function (Cine) {
    // Creating a new Mongoose Object by using the new keyword
    let newCinema;

    newCinema = new Cinema({
        name: Cine.name,
        owner: Cine.owner,
        address: Cine.address,
        location: Cine.location,
        rooms: []
    })

    try {
        // Saving the Cinema 
        let savedCinema = await newCinema.save();
        return savedCinema;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)
        throw Error("Error while Creating Cinema")
    }
}

exports.updateCinema = async function (Cine) {

    let _id = { _id: Cine._id }
    let oldCinema;
    try {
        //Find the old Cinema Object by the Id
        oldCinema = await Cinema.findOne(_id);
    } catch (e) {
        throw Error("Error occured while Finding the Cinema")
    }
    // If no old Cinema Object exists return false
    if (!oldCinema) {
        return false;
    }
    //Edit the Cinema Object
    Object.keys(Cine).forEach(key => {
        oldCinema[key] = Cine[key];
    });

    try {
        let savedCinema = await oldCinema.save()
        return savedCinema;
    } catch (e) {
        throw Error("And Error occured while updating the Cinema");
    }
}


exports.deleteCinema = async function (_id) {

    // Delete the Cinema
    try {
        let deleted = await Cinema.findOneAndRemove({
            _id: _id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Cinema Could not be deleted")
        }
        return deleted;
    } catch (e) {
        console.log(e)
        throw Error("Error Occured while Deleting the Cinema")
    }
}
