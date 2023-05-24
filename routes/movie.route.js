let express = require('express')
let router = express.Router()
let MovieController = require('../controllers/movie.controller');
// let MailController = require('../controllers/mail.controller');
let Authorization = require('../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res) {
    res.send('Movies route');
  });
router.post('/', MovieController.createMovie)
router.get('/', MovieController.getMovies)
router.get('/:id',MovieController.getMovieById)
router.put('/', MovieController.updateMovie)
router.delete('/:id', MovieController.removeMovie)
// router.post('/sendMail',MailController.sendEmail)



// Export the Router
module.exports = router;
