const User = require('../models/user');
const emailValidator = require('../utils/emailValidator');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');
const db = require('../db/mongoDbConnection');

module.exports = class UserController {
    static async register(req, res, next) {
        try {

            const { username, email, password, firstName, lastName } = req.body

            const validateEmail = emailValidator(email)

            if (!validateEmail) throw { name: `BadRequest`, message: `Invalid email format` }

            if (password.length < 6 || username.length < 6) throw { name: `BadRequest`, message: `Required field length must be minimum 6 characters` }

            const user = await User.findOne({
                email: email
            })

            if (user) throw { name: `Unprocessable Entity (WebDAV)`, message: `Account already exist` }

            const registerFormField = {
                username,
                email,
                password: hashPassword(password),
                firstName,
                lastName
            }

            if (!registerFormField) throw { name: `BadRequest`, message: `All field is required` }

            const addUser = new User(registerFormField)

            const result = addUser.save()

            if (result) {
                return res.status(201).json({ message: `Successfully created new account` })
            }

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { username, email, password } = req.body

            const user = await User.findOne({
                username: username
            })

            if (!user) throw { name: `Unauthorized`, message: `Account doesn't exist` }

            const checkUserPassword = comparePassword(password, user.password)

            if (!checkUserPassword) throw { name: `Unauthorized`, message: `Account doesn't exist` }

            const accessToken = generateToken({ id: user.id })

            return res.status(200).json({ accessToken })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}