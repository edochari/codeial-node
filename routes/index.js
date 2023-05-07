const express = require('express');
const homeController = require('../controllers/home_controller');
const postController = require('../controllers/post_controller');
const router = express.Router();

router.get('/',homeController.home);

router.use('/users',require('./users'));
router.use('/posts',require('./posts'));

console.log("router loaded");

module.exports=router;