const express = require('express');
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');
const router = express.Router();

router.post('/create',passport.checkAuthentication ,commentsController.create);
router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy);

module.exports=router;