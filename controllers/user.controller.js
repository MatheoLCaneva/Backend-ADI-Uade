let UserService = require('../services/user.service');
// Saving the context of this module inside the _the letiable
_this = this;

// Async Controller function to get the To do List
exports.getUsers = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let page = req.query.page ? req.query.page : 1
    console.log(page)
    let limit = req.query.limit ? req.query.limit : 10;
    try {
        let Users = await UserService.getUsers({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Users, message: "Succesfully Users Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.getUsersByMail = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let page = req.query.page ? req.query.page : 1
    let limit = req.query.limit ? req.query.limit : 10;
    let filtro = { email: req.body.email }
    try {
        let Users = await UserService.getUsers(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Users, message: "Succesfully Users Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createUser = async function (req, res) {
    // Req.Body contains the form submit values.
    let User = {
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        rol: req.body.rol,
        imgUser: req.body.imgUser

    }
    try {
        // Calling the Service function with the new object from the Request Body
        let createdUser = await UserService.createUser(User)
        console.log(createdUser)
        if (createdUser.description) { return res.status(409).json({ status: 409, message: "Email already exist" }) }
        else {
            return res.status(201).json({ status: 201, createdUser, message: "Succesfully Created User" })
        }
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({ status: 400, message: "User Creation was Unsuccesfull" })
    }
}

exports.updateUser = async function (req, res, next) {

    // Id is necessary for the update

    const User = req.body
    try {
        let updatedUser = await UserService.updateUser(User)
        return res.status(200).json({ status: 200, data: updatedUser, message: "Succesfully Updated User" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}

exports.removeUser = async function (req, res, next) {

    let email = req.body.email;
    try {
        let deleted = await UserService.deleteUser(email);
        res.status(200).send({ deleted, status: 200, message: "Succesfully Deleted... " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}


exports.loginUser = async function (req, res) {
    // Req.Body contains the form submit values.
    let User;
    if (req.body.rol === 'User') {
        User = {
            email: req.body.email,
            rol: 'User'
        }
    }
    else {
        User = {
            email: req.body.email,
            password: req.body.password,
            rol: req.body.rol
        }
    }

    try {
        // Calling the Service function with the new object from the Request Body
        let loginUser = await UserService.loginUser(User);
        if (loginUser === 0)
            return res.status(400).json({ status: 400, message: "Invalid password" })

        else if (loginUser === 'No user') 
            return res.status(401).json({status: 401, message: 'No user'})

        else
            return res.status(201).json({ status: 201, loginUser, message: "Succesfully login" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log('ERROR ACA EN EL INVALID PASSWORD')
        return res.status(401).json({ status: 401, message: "Invalid username or password" })
    }
}


