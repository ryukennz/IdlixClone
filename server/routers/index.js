const express = require('express')
const UserController = require('../controllers/userController')
const MovieController = require('../controllers/movieController')
const { authentication } = require('../middlewares/auth')
const WatchListController = require('../controllers/watchListController')
const router = express.Router()

router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.post('/forgot-password', UserController.forgotPassword)

router.get('/movies', MovieController.getMovies)

router.use(authentication)

router.post('/watch-list', WatchListController.addToWatchList)

router.get('/watch-list', WatchListController.getWatchList)

module.exports = router