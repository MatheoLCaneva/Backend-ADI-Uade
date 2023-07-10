// Gettign the Newly created Mongoose Model we just created 
let User = require('../models/User.model');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
// let Class = require('../models/Class.model')
// Saving the context of this module inside the _the letiable
_this = this

// Async function to get the User List
exports.getUsers = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    let options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query", query)
        let Users = await User.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Users;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services", e)
        throw Error('Error while Paginating Users');
    }
}

exports.createUser = async function (user) {
    // Creating a new Mongoose Object by using the new keyword
    let newUser;

    const existingUser = await User.findOne({ email: user.email, rol: user.rol });
    if (existingUser) {
        error = {
            description: "Mail used"
        }
        return error
    }

    if (user.rol == "Owner") {
        let hashedPassword = bcrypt.hashSync(user.password, 8);
        newUser = new User({
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            password: hashedPassword,
            rol: user.rol,
            imgUser: user.imgUser
        })
        try {
            // Saving the User 
            let savedUser = await newUser.save();
            let token = jwt.sign({
                id: savedUser._id
            }, process.env.SECRET, {
                expiresIn: 86400 // expires in 24 hours
            });
            return token;
        } catch (e) {
            // return a Error message describing the reason 
            console.log(e)
            throw Error("Error while Creating User")
        }
    }

    else if (user.rol == "User") {

        newUser = new User({
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            // password: hashedPassword,
            rol: user.rol,
            imgUser: user.imgUser
        })
        let savedUser = await newUser.save();
        return savedUser
    }

    else {
        throw Error("Rol must be Owner or User")
    }
}

exports.updateUser = async function (user) {

    // let hashedPassword = bcrypt.hashSync(user.password, 8);
    // user.password = hashedPassword
    let _id = { _id: user._id }
    try {
        //Find the old User Object by the Id
        let savedUser = await User.findOneAndUpdate(_id, user, { new: true });
        return savedUser
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
}

exports.deleteUser = async function (mail) {

    // Delete the User
    console.log(mail)
    try {
        let deleted = await User.findOneAndRemove({
            name: mail
        })
        console.log("Usuario", deleted)
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted;
    } catch (e) {
        console.log(e)
        throw Error("Error Occured while Deleting the User")
    }
}


exports.loginUser = async function (user) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User
        if (user.rol !== 'User') {
            let _details = await User.findOne({
                email: user.email, rol: user.rol
            });
            console.log(_details)
            let passwordIsValid = bcrypt.compareSync(user.password, _details.password);
            if (!passwordIsValid) return 0;

            let token = jwt.sign({
                id: _details._id
            }, process.env.SECRET, {
                expiresIn: 86400 // expires in 24 hours
            });
            return { token: token, user: _details };
        }
        else {
            let _details = await User.findOne({
                email: user.email, rol: user.rol
            });
            if (!_details) {
                return 'No user'
            }
            return _details
        }

    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login User")
    }

}