const express = require('express')
var router = express.Router()
const login = require('../controllers/logincontroller')

router.get('/all',login.getloginAll)

router.get('/:id', login.getloginId)

router.delete('/delete', login.getloginDelete)

router.post('/rephone', login.getRegisterPhone)

router.post('/loginone', login.getOnelogin)

router.post('/logintwo', login.getTwologin)

router.post('/loginthree', login.getThreelogin)

router.post('/logincode', login.getCodelogin)

router.post('/code', login.getCode)

router.post('/insertcode', login.getInsertCode)

router.post('/isphone', login.getisPhone)

module.exports = router