let Reservationservice = require('../services/reservation.service');
// Saving the context of this module inside the _the letiable
let _this = this;

// Async Controller function to get the To do List
exports.getReserves = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let page = req.query.page ? req.query.page : 1
    let limit = req.query.limit ? req.query.limit : 20;
    try {
        let Reservations = await Reservationservice.getReservations({}, page, limit)
        // Return the Reservations list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, Reservations: Reservations, message: "Succesfully Reservations Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.getReserveById = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let page = req.query.page ? req.query.page : 1
    let limit = req.query.limit ? req.query.limit : 10;
    let filtro = { _id: req.params.id }
    try {
        let Reservations = await Reservationservice.getReservations(filtro, page, limit)
        // Return the Reservations list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Reservations, message: "Succesfully Reservations Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getReservesByUser = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let page = req.query.page ? req.query.page : 1
    let limit = req.query.limit ? req.query.limit : 10;
    let filtro = { 'user.email': req.params.email }
    try {
        let Reservations = await Reservationservice.getReservations(filtro, page, limit)
        // Return the Reservations list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Reservations, message: "Succesfully Reservations Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createReserve = async function (req, res) {
    // Req.Body contains the form submit values.
    let Reserve = {
        user: req.body.user,
        cinema: req.body.cinema,
        room: req.body.room,
        movie: req.body.movie,
        date: req.body.date,
        hour: req.body.hour,
        seats: req.body.seats,
        totalPrice: req.body.totalPrice,
        functionId: req.body.functionId,
        qrCode: req.body.qrCode
    }

    try {
        // Calling the Service function with the new object from the Request Body
        let createdReservation = await Reservationservice.createReserve(Reserve)
        return res.status(201).json({ status: 201, created: createdReservation, message: "Succesfully Created Reserve" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({ status: 400, message: "Reserve Creation was Unsuccesfull" })
    }
}

exports.updateReserve = async function (req, res, next) {


    let Reserve = req.body
    try {
        let updatedReserve = await Reservationservice.updateReservation(Reserve)
        return res.status(200).json({ status: 200, Reserve: updatedReserve, message: "Succesfully Updated Reserve" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}

exports.removeReserve = async function (req, res, next) {

    let _id = req.params.id;
    try {
        let deleted = await Reservationservice.deleteReservation(_id);
        res.status(200).send({ deleted, status: 200, message: "Succesfully Deleted... " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}


