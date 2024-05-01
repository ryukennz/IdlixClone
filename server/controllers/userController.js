const User = require('../models/user');
const emailValidator = require('../utils/emailValidator');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');
// const db = require('../db/mongoDbConnection');

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

            const user = await User.findOne({
                username: username
            })

            if (!user) throw { name: `Unauthorized`, message: `Account doesn't exist` }

            const checkUserPassword = comparePassword(password, user.password)

            if (!checkUserPassword) throw { name: `Unauthorized`, message: `Account doesn't exist` }

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
                to: process.env.AUTH_RECEIVER,
                subject: 'Reset Password Link',
                text: `http://localhost:5173/reset-password/${user._id}/${token}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });


        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}