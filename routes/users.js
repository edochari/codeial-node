const express = require('express');
const userController=require('../controllers/user_controller');
const router = express.Router();
const passport = require('passport');

router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);
router.post('/create',userController.create);
router.post('/create-session',passport.authenticate(
    "local",
    {failureRedirect:'/users/sign-in'}
),userController.createSession);
router.get('/sign-out',userController.destroySession);
module.exports=router;