let express = require('express')
let router = express.Router()
let CinemaController = require('../controllers/cinema.controller');
// let MailController = require('../controllers/mail.controller');
let Authorization = require('../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res) {
    res.send('Cinemas route');
  });
router.post('/', CinemaController.createCinema)
router.get('/', CinemaController.getCinemas)
router.get('/:id',CinemaController.getCinemaById)
router.get('/owner/:ownerId', CinemaController.getCinemaByOwner)
router.put('/', CinemaController.updateCinema)
router.delete('/:id', CinemaController.removeCinema)
// router.post('/sendMail',MailController.sendEmail)



// Export the Router
module.exports = router;
