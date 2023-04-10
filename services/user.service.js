// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/User.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// var Class = require('../models/Class.model')
// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getUsers = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query", query)
        var Users = await User.paginate(query, options)
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
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    var newUser;

    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
        error = {
            description: "Mail used"
        }
        return error
    }

    if (user.rol == "Owner") {
        newUser = new User({
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            password: hashedPassword,
            rol: user.rol,
            imgUser: user.imgUser
        })
    }

    else if (user.rol == "User") {

        newUser = new User({
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            password: hashedPassword,
            rol: user.rol,
            imgUser: user.imgUser
        })

    }

    else {
        throw Error("Rol must be Owner or User")
    }

    try {
        // Saving the User 
        var savedUser = await newUser.save();
        var token = jwt.sign({
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

exports.updateUser = async function (user) {

    var _id = { _id: user._id }
    console.log('pase el controller')
    console.log(user)
    try {
        //Find the old User Object by the Id
        var oldUser = await User.findOne(_id);
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old User Object exists return false
    if (!oldUser) {
        return false;
    }
    //Edit the User Object
    if (user.name !== null) {
        oldUser.name = user.name;
    }

    if (user.lastName !== null) {
        oldUser.lastName = user.lastName;
    }

    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}

exports.deleteUser = async function (mail) {

    // Delete the User
    console.log(mail)
    try {
        var deleted = await User.findOneAndRemove({
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
        console.log("login:", user)
        var _details = await User.findOne({
            email: user.email
        });
        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        if (!passwordIsValid) return 0;

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return { token: token, user: _details };
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login User")
    }

}