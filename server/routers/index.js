const express = require('express')
const UserController = require('../controllers/userController')
const MovieController = require('../controllers/movieController')
const router = express.Router()

router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.post('/forgot-password', UserController.forgotPassword)

router.get('/movies', MovieController.getMovies)

module.exports = router