// Gettign the Newly created Mongoose Model we just created 
let Room = require('../models/Room.model');
let Cinema = require('../models/Cinema.model');
// let Class = require('../models/Class.model')
// Saving the context of this module inside the _the letiable
let _this = this

// Async function to get the Room List
exports.getRooms = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    let options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query", query)
        let Rooms = await Room.paginate(query, options)
        // Return the Roomd list that was retured by the mongoose promise
        return Rooms;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services", e)
        throw Error('Error while Paginating Rooms');
    }
}

exports.getRoomsByCinema = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    let options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query", query)
        let Rooms = await Room.paginate(query, options)
        // Return the Roomd list that was retured by the mongoose promise
        return Rooms;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services", e)
        throw Error('Error while Paginating Rooms');
    }
}

exports.createRoom = async function (room) {
    // Creating a new Mongoose Object by using the new keyword
    let newRoom;
    const seats = []

    for (let row = 1; row <= room.rows; row++) {
        for (let column = 1; column <= room.columns; column++) {
            const seat = { row, column };
            seats.push(seat);
        }
    }
    newRoom = new Room({
        name: room.name,
        owner: room.owner,
        cinema: room.cinema,
        price: room.price,
        status: true,
        seats: seats
    })

    try {
        let _id = { _id: room.cinema }
        const cinema = await Cinema.findOne(_id)
        cinema.rooms.push(newRoom)
        cinema.save()
    } catch (e) {
        throw Error("Error. No cine with that ID")
    }



    try {
        // Saving the Room 
        let savedRoom = await newRoom.save();
        return savedRoom;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)
        throw Error("Error while Creating Room")
    }
}

exports.updateRoom = async function (room) {

    let _id = { _id: room._id }
    let oldRoom;
    try {
        //Find the old room Object by the Id
        oldRoom = await room.findOne(_id);
    } catch (e) {
        throw Error("Error occured while Finding the room")
    }
    // If no old room Object exists return false
    if (!oldRoom) {
        return false;
    }
    //Edit the room Object
    Object.keys(room).forEach(key => {
        oldRoom[key] = room[key];
    });

    try {
        let savedRoom = await oldRoom.save()
        return savedRoom;
    } catch (e) {
        throw Error("And Error occured while updating the room");
    }
}

exports.deleteRoom = async function (_id) {

    // Delete the Room
    try {
        let deleted = await Room.findOneAndRemove({
            _id: _id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Room Could not be deleted")
        }
        return deleted;
    } catch (e) {
        console.log(e)
        throw Error("Error Occured while Deleting the Room")
    }
}
