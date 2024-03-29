const User = require('../models/user');
const emailValidator = require('../utils/emailValidator');
const { hashPassword } = require('../utils/bcrypt');

module.exports = class UserController {
    static async register(req, res, next) {
        try {


            const { username, email, password, firstName, lastName } = req.body

            const validateEmail = emailValidator(email)

            if (!validateEmail) throw { name: `BadRequest`, message: `Invalid email format` }

            if (password.length < 6 || username.length < 6) throw { name: `BadRequest`, message: `Required field length must be minimum 6 characters` }

            const addUser = new User({
                username,
                email,
                password: hashPassword(password),
                firstName,
                lastName
            })

            if (!addUser) throw { name: `BadRequest`, message: `All field is required` }

            const result = addUser.save()

            if (result) {
                return res.status(201).json({ message: `Successfully created new account` })
            } else {
                throw error
            }
            
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async login(req, res, next) {
        try {

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}