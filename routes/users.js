const express = require('express');
const userController=require('../controllers/user_controller');
const router = express.Router();
const passport = require('passport');
router.get('/profile',passport.checkAuthentication,userController.profile);
// router.get('/profile/:id',passport.authenticate('jwt',{session:false}),userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.get('/sign-up',userController.signUp);
// router.get('/sign-in',userController.signIn);
router.post('/create',userController.create);
// router.post('/create-session',passport.authenticate(
//     "jwt",
//     {session:false}
// ),userController.createSession);
router.post('/create-session',passport.authenticate(
    "local",
{failureRedirect:'/users/sign-in'})
,userController.createSession);
router.get('/sign-out',userController.destroySession);

//sending request to google
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))

//getting information from google
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession);
module.exports=router;