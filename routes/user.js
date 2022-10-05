const { 
    signup,
    deleteUser, 
    updateUser,
     getUser ,
     login,
     forgotPassword
    } = require('../contollers/userInfo.js')
const {createAppointment} = require('../contollers/appointmentContoller')
const { verifyToken } = require('../auth/user')
const { User } = require('../models/userModel.js')

const express = require('express')

const router = express.Router()
router.post('/signup', signup())  
router.put('/signup/:id', updateUser())
router.delete('/signup/:id', deleteUser())
router.get('/signup', getUser())
router.post('/login',login())
router.put('/forgotpassword', forgotPassword())
router.post('/createAppointment', createAppointment())



  

module.exports = router;