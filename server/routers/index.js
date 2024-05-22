const express = require('express')
const UserController = require('../controllers/userController')
const MovieController = require('../controllers/movieController')
const { authentication } = require('../middlewares/auth')
const WatchListController = require('../controllers/watchListController')
const router = express.Router()

router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.post('/forgot-password', UserController.forgotPassword)

router.post('/reset-password/:id/:token', UserController.resetPassword)

router.get('/movies', MovieController.getMovies)

router.use(authentication)

router.get('/watch-list', WatchListController.getWatchListByCurrentUser)

router.post('/watch-list', WatchListController.addToWatchList)


module.exports = router