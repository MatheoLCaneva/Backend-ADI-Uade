let CinemaService = require('../services/cinema.service');
// Saving the context of this module inside the _the letiable
let _this = this;

// Async Controller function to get the To do List
exports.getCinemas = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let page = req.query.page ? req.query.page : 1
    console.log(page)
    let limit = req.query.limit ? req.query.limit : 20;
    try {
        let Cinemas = await CinemaService.getCinemas({}, page, limit)
        // Return the Cinemas list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, Cinemas: Cinemas, message: "Succesfully Cinemas Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.getCinemaById = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let page = req.query.page ? req.query.page : 1
    let limit = req.query.limit ? req.query.limit : 10;
    let filtro = { _id: req.params.id }
    try {
        let Cinemas = await CinemaService.getCinemas(filtro, page, limit)
        // Return the Cinemas list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Cinemas, message: "Succesfully Cinemas Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getCinemaByOwner = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let page = req.query.page ? req.query.page : 1
    let limit = req.query.limit ? req.query.limit : 10;
    let filtro = { owner: req.params.ownerId }
    try {
        let Cinemas = await CinemaService.getCinemas(filtro, page, limit)
        // Return the Cinemas list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Cinemas, message: "Succesfully Cinemas Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createCinema = async function (req, res) {
    // Req.Body contains the form submit values.
    let Cinema = {
        name: req.body.name,
        owner: req.body.owner,
        address: req.body.address,
        location: req.body.location,
    }
    try {
        // Calling the Service function with the new object from the Request Body
        let createdCinema = await CinemaService.createCinema(Cinema)
        console.log(createdCinema)
        return res.status(201).json({ status: 201, createdCinema, message: "Succesfully Created Cinema" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({ status: 400, message: "Cinema Creation was Unsuccesfull" })
    }
}

exports.updateCinema = async function (req, res, next) {

    
    let Cinema = req.body
    console.log('req.body update cinema', req.body)
    try {
        let updatedCinema = await CinemaService.updateCinema(Cinema)
        return res.status(200).json({ status: 200, cinema: updatedCinema, message: "Succesfully Updated Cinema" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}

exports.removeCinema = async function (req, res, next) {

    let _id = req.params.id;
    try {
        let deleted = await CinemaService.deleteCinema(_id);
        res.status(200).send({ deleted, status: 200, message: "Succesfully Deleted... " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}


