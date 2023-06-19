let express = require('express')
let router = express.Router()
let UserController = require('../controllers/user.controller');
let MailController = require('../controllers/mail.controller');
let Authorization = require('../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res) {
    res.json({data:'Llegaste a la ruta de users'});
  });
router.post('/', UserController.createUser)
router.post('/login', UserController.loginUser)
// router.get('/',Authorization, UserController.getUsers)
router.post('/userByMail', Authorization, UserController.getUsersByMail)
router.put('/', UserController.updateUser)
router.delete('/', UserController.removeUser)
router.post('/sendMail',MailController.sendEmail)



// Export the Router
module.exports = router;
