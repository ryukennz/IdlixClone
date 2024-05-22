const User = require('../models/user');
const emailValidator = require('../utils/emailValidator');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { generateToken, verifyToken } = require('../utils/jwt');
const { isSpaceOnlyRegister, isSpaceOnlyLogin } = require('../utils/isSpaceOnly');
// const db = require('../db/mongoDbConnection');

module.exports = class UserController {

    static async register(req, res, next) {
        try {

            const { username, email, password, firstName, lastName } = req.body

            if (!username || !email || !password || !firstName || !lastName || isSpaceOnlyRegister(username, email, password, firstName, lastName)) throw { name: `BadRequest`, message: `Invalid input` }

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

            const addUser = new User(registerFormField)

            const result = await addUser.save()

            return res.status(201).json({ message: `Successfully created new account`, result })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async login(req, res, next) {
        try {

            const { username, password } = req.body

            if (!username || !password || isSpaceOnlyLogin(username, password)) throw { name: `BadRequest`, message: `Invalid input` }

            const user = await User.findOne({
                username: username
            })

            if (!user) throw { name: `Unauthorized`, message: `Account doesn't exist` }

            const checkUserPassword = comparePassword(password, user.password)

            if (!checkUserPassword) return res.status(401).json({ message: `Account doesn't exist` })

            const accessToken = generateToken({ id: user._id })

            return res.status(200).json({ accessToken })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async forgotPassword(req, res, next) {
        try {
            const { email } = req.body

            const user = await User.findOne({
                email: email
            })

            if (!user) throw { name: `NotFound`, message: `User doesn't exist` }

            const token = generateToken({ id: user._id })

            const nodemailer = require('nodemailer');

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.AUTH_USER,
                    pass: process.env.AUTH_PASS
                }
            });

            const mailOptions = {
                from: process.env.AUTH_USER,
                to: user.email,
                subject: 'Reset Password Link',
                text: `
                http://localhost:5173/reset-password/${user._id}/${token}
                `
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    return res.status(200).json({ message: `Email sent to: ${user.email}` })
                }
            });

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async resetPassword(req, res, next) {
        try {
            const { id, token } = req.params
            const { password } = req.body

            const user = await User.findOne({
                _id: id
            })

            if (!user) throw { name: `NotFound`, message: `User doesn't exist` }

            const checkToken = verifyToken(token)

            if (!checkToken) {
                return res.status(400).json({ message: 'Invalid or expired token' });
            }

            if (password.length < 6) throw { name: `BadRequest`, message: `Required field length must be minimum 6 characters` }

            const updatePassword = hashPassword(password)

            user.password = updatePassword
            const result = await user.save()

            return res.status(200).json({ message: `Successfully updated password`, result })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}