let express = require('express')
let router = express.Router()
let ReservationController = require('../controllers/reservation.controller');
// let MailController = require('../controllers/mail.controller');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function (req, res) {
    res.send('Functions Route');
});


router.post('/', ReservationController.createReserve)
router.get('/', ReservationController.getReserves)
router.get('/:id', ReservationController.getReserveById)
router.get('/user/:email', ReservationController.getReservesByUser)
router.put('/', ReservationController.updateReserve)
router.delete('/:id', ReservationController.removeReserve)

// Export the Router
module.exports = router;