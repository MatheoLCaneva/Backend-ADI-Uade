// Gettign the Newly created Mongoose Model we just created 
let Reservation = require('../models/Reservation.model');
let Function = require('../models/function.model')
// let Class = require('../models/Class.model')
// Saving the context of this module inside the _the letiable
let _this = this

// Async function to get the Reservation List
exports.getReservations = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    let options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query", query)
        let Reservations = await Reservation.paginate(query, options)
        // Return the Functiond list that was retured by the mongoose promise
        return Reservations;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services", e)
        throw Error('Error while Paginating Reservations');
    }
}

exports.createReserve = async function (reservation) {
    // Creating a new Mongoose Object by using the new keyword
    let newReserve;

    try {
        console.log(reservation)
        const func = await Function.findOne({_id:reservation.functionId})
        reservation.seats.forEach(reservedSeat => {
            const matchingSeatIndex = func.seats.findIndex(seat =>
                seat.row === reservedSeat.row && seat.column === reservedSeat.column
            );

            if (matchingSeat !== -1) {
                func.seats[matchingSeatIndex].isUsed = true
            }
        })

        await func.save()

    } catch (e) {
        throw Error('Error while searching function')
    }

    newReserve = new Reservation({
        cinema: reservation.cinema,
        room: reservation.room,
        movie: reservation.movie,
        date: reservation.date,
        hour: reservation.hour,
        seats: reservation.seats,
        totalPrice: reservation.totalPrice,
        qrCode: reservation.qrCode
    })

    try {
        // Saving the Reservation 
        let savedReservation = await newReserve.save();
        return savedReservation;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)
        throw Error("Error while Creating Reservation")
    }
}

exports.updateReservation = async function (reservation) {

    let _id = { _id: reservation._id }
    try {
        //Find the old Reservation Object by the Id
        let savedReservation = await Reservation.findOneAndReplace(_id, reservation);
        return savedReservation
    } catch (e) {
        throw Error("Error occured while Finding the Reservation")
    }
}

exports.deleteReservation = async function (_id) {

    // Delete the Reservation
    try {
        let deleted = await Reservation.findOneAndRemove({
            _id: _id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Reservation Could not be deleted")
        }
        return deleted;
    } catch (e) {
        console.log(e)
        throw Error("Error Occured while Deleting the Reservation")
    }
}
