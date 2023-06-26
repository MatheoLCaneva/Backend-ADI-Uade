let express = require('express')
let router = express.Router()
let RoomController = require('../controllers/room.controller');
// let MailController = require('../controllers/mail.controller');
let Authorization = require('../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function (req, res) {
  res.send('Rooms route');
});
router.post('/', RoomController.createRoom)
router.get('/', RoomController.getRooms)
router.get('/:id', RoomController.getRoomById)
router.get('/cinema/:cinemaId', RoomController.getRoomsByCinema)
router.put('/', RoomController.updateRoom)
router.delete('/:id', RoomController.removeRoom)
// router.post('/sendMail',MailController.sendEmail)



// Export the Router
module.exports = router;
