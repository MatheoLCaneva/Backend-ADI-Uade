let express = require('express')
let router = express.Router()
let CommentController = require('../controllers/comment.controller');
// let MailController = require('../controllers/mail.controller');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function (req, res) {
    res.send('Comments Route');
});


router.post('/', CommentController.createComment)
router.get('/', CommentController.getComments)
router.get('/user/:email/:movie', CommentController.getCommentsByUser)
router.put('/', CommentController.updateComment)
// router.delete('/:id', CommentController.removeComment)

// Export the Router
module.exports = router;