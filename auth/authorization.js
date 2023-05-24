/**
 * @type {Module jsonwebtoken|Module jsonwebtoken}
 * @author | Mohammad Raheem
 */
let jwt = require('jsonwebtoken');
let config = require('../config').config();

let authorization = function (req, res, next) {

    let token = req.headers['x-access-token'];
    console.log(typeof(token))
    console.log("token",token);
    let msg = {auth: false, message: 'No token provided.'};
    if (!token)
        res.status(500).send(msg);

    let sec = process.env.SECRET;
    //console.log("secret",sec)
    jwt.verify(token, sec, function (err, decoded) {
        let msg = {auth: false, message: 'Failed to authenticate token.'};
        if (err)
        res.status(500).send(msg);
        console.log('REQID', req.userId)
        req.userId = decoded.id;
        next();
    });
}

module.exports = authorization;
