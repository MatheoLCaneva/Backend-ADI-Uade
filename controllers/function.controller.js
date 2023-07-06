let FunctionService = require('../services/function.service');
// Saving the context of this module inside the _the letiable
let _this = this;

// Async Controller function to get the To do List
exports.getFunctions = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let page = req.query.page ? req.query.page : 1
    let limit = req.query.limit ? req.query.limit : 20;
    try {
        let Functions = await FunctionService.getFunctions({}, page, limit)
        // Return the Functions list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, Functions: Functions, message: "Succesfully Functions Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.getFunctionById = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let page = req.query.page ? req.query.page : 1
    let limit = req.query.limit ? req.query.limit : 10;
    let filtro = { _id: req.params.id }
    try {
        let Functions = await FunctionService.getFunctions(filtro, page, limit)
        // Return the Functions list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Functions, message: "Succesfully Functions Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getFunctionByRoom = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let page = req.query.page ? req.query.page : 1
    let limit = req.query.limit ? req.query.limit : 10;
    let filtro = { room: req.params.roomId }
    try {
        let Functions = await FunctionService.getFunctions(filtro, page, limit)
        // Return the Functions list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Functions, message: "Succesfully Functions Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getFunctionByCinema = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let page = req.query.page ? req.query.page : 1
    let limit = req.query.limit ? req.query.limit : 10;
    let filtro = {'cinema.id': req.params.cinemaId }
    try {
        let Functions = await FunctionService.getFunctions(filtro, page, limit)
        // Return the Functions list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Functions, message: "Succesfully Functions Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createFunction = async function (req, res) {
    // Req.Body contains the form submit values.
    let Function = {
        cinema: req.body.cinema,
        room: req.body.room,
        movie: req.body.movie,
        date: req.body.date,
        hour: req.body.hour
    }
    try {
        // Calling the Service function with the new object from the Request Body
        let createdFunction = await FunctionService.createFunction(Function)
        console.log(createdFunction)
        return res.status(201).json({ status: 201, createdFunction, message: "Succesfully Created Function" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({ status: 400, message: "Function Creation was Unsuccesfull" })
    }
}

exports.updateFunction = async function (req, res, next) {


    let Function = req.body
    try {
        let updatedFunction = await FunctionService.updateFunction(Function)
        return res.status(200).json({ status: 200, Function: updatedFunction, message: "Succesfully Updated Function" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}

exports.removeFunction = async function (req, res, next) {

    let _id = req.params.id;
    try {
        let deleted = await FunctionService.deleteFunction(_id);
        res.status(200).send({ deleted, status: 200, message: "Succesfully Deleted... " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}


