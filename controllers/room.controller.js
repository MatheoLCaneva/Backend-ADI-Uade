let RoomService = require('../services/room.service');
// Saving the context of this module inside the _the letiable
let _this = this;

// Async Controller function to get the To do List
exports.getRooms = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let page = req.query.page ? req.query.page : 1
    console.log(page)
    let limit = req.query.limit ? req.query.limit : 20;
    try {
        let Rooms = await RoomService.getRooms({}, page, limit)
        // Return the Rooms list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, Rooms: Rooms, message: "Succesfully Rooms Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.getRoomById = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let page = req.query.page ? req.query.page : 1
    let limit = req.query.limit ? req.query.limit : 10;
    let filtro = { _id: req.params.id }
    try {
        let Rooms = await RoomService.getRooms(filtro, page, limit)
        // Return the Rooms list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Rooms, message: "Succesfully Rooms Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getRoomByOwner = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let page = req.query.page ? req.query.page : 1
    let limit = req.query.limit ? req.query.limit : 10;
    let filtro = { owner: req.params.ownerId }
    try {
        let Rooms = await RoomService.getRooms(filtro, page, limit)
        // Return the Rooms list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Rooms, message: "Succesfully Rooms Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createRoom = async function (req, res) {
    // Req.Body contains the form submit values.
    let Room = {
        name: req.body.name,
        owner: req.body.owner,
        cinema: req.body.cinema,
        price: req.body.price,
        rows: req.body.rows,
        columns: req.body.columns
    }
    try {
        // Calling the Service function with the new object from the Request Body
        let createdRoom = await RoomService.createRoom(Room)
        console.log(createdRoom)
        return res.status(201).json({ status: 201, createdRoom, message: "Succesfully Created Room" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({ status: 400, message: "Room Creation was Unsuccesfull" })
    }
}

exports.updateRoom = async function (req, res, next) {


    let Room = req.body
    try {
        let updatedRoom = await RoomService.updateRoom(Room)
        return res.status(200).json({ status: 200, Room: updatedRoom, message: "Succesfully Updated Room" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}

exports.removeRoom = async function (req, res, next) {

    let _id = req.params.id;
    try {
        let deleted = await RoomService.deleteRoom(_id);
        res.status(200).send({ deleted, status: 200, message: "Succesfully Deleted... " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}


