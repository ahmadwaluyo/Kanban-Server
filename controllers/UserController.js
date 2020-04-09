const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { decrypt } = require('../helpers/bcrypt');

class UserController {
    static register(req, res, next) {
        const { email, password } = req.body;
        const created = {
            email,
            password
        }
        User.findOne({
            where: {
                email
            }
        })
            .then(foundUser => {
                if(foundUser) {
                    return next({
                        name: 'Forbidden',
                        errors: { message: 'Email has already registered'}
                    })
                } else {
                    return User.create(created)
                }
            })
            .then(newUser => {
                let test = {
                    id: newUser.dataValues.id,
                    email: newUser.dataValues.email
                }
                const token = generateToken(test);
                console.log(token)
                return res.status(201).json(test)
            })
            .catch(err => {
                return next(err)
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body;
        User.findOne({
            where: {
                email
            }
        })
            .then(foundUser => {
                const payload = { 
                    id: foundUser.id,
                    email: foundUser.email
                 };
                 const token = generateToken(payload);
                 if(foundUser) {
                     let verify = decrypt(password, foundUser.password);
                     if(verify) {
                        return res.status(200).json({
                            msg: 'User successfully login',
                            token
                        })
                     } else {
                        return next({
                            name: 'BadRequest',
                            errors: { message: 'Invalid email or password'}
                        })
                     }
                 } else {
                    return next({
                        name: 'BadRequest',
                        errors: { message: 'Invalid email or password'}
                    })
                 }
            })
            .catch(err => {
                return next({
                    name: 'NotFound',
                    errors: { message : 'User Not Found' }
                })
            })
    }

    static googleSignIn(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const email = {};
        const token = req.headers.token;
        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                let payload = ticket.getPayload();
                email.payload = payload.email;
                return User.findOne({
                    where: {
                        email: email.payload
                    }
                })
            })
            .then(data => {
                if(data) {
                    return data;
                } else {
                    return User.create({
                        email: email.payload,
                        password: process.env.MANUAL_PWD
                    })
                }
            })
            .then(data => {
                const payload = {
                    id: data.id,
                    email: data.email
                }
                const token = generateToken(payload);
                return res.status(201).json(token)
            })
            .catch(err =>{
                return next(err)
            })
    }
}


module.exports = UserController;