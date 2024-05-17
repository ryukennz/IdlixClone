const User = require("../models/user")
const { verifyToken } = require("../utils/jwt")

const authentication = async (req, res, next) => {
    try {
        let token = req.headers.authorization

        if (!token) throw { name: `Unauthorized` }

        if (token.slice(0, 7) !== `Bearer `) throw { name: `Unauthorized` }

        token = token.slice(7)

        const payload = verifyToken(token)

        if (!payload) throw { name: `Unauthorized` }

        const user = await User.findById(payload.id)

        if (!user) throw { name: `Unauthorized` }

        req.user = user

        next()

    } catch (error) {
        console.log(error);
        next(error)
    }
}

const authorization = async (req, res, next) => {
    try {

        const currentUser = req.user.id

        const user = await User.findById()

        if (currentUser !== user) throw { name: `Forbidden`, message: `You aren't authorized` }

        next()

    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = {
    authentication,
    authorization
}