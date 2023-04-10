let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.send('Welcome to Express');
});

router.get('/users/:test', function(req, res) {
  res.send(`My param is ${req.params.test}`);
});

module.exports = router;
