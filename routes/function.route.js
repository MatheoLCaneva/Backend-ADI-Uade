let express = require('express')
let router = express.Router()
let FunctionController = require('../controllers/function.controller');
// let MailController = require('../controllers/mail.controller');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function (req, res) {
    res.send('Functions Route');
});


router.post('/', FunctionController.createFunction)
router.get('/', FunctionController.getFunctions)
router.get('/:id', FunctionController.getFunctionById)
router.get('/room/:roomId', FunctionController.getFunctionByRoom)
router.get('/cinema/:cinemaId', FunctionController.getFunctionByCinema)
router.post('/filters/', FunctionController.getFunctionsWithFilters)
router.put('/', FunctionController.updateFunction)
router.delete('/:id', FunctionController.removeFunction)



// Export the Router
module.exports = router;