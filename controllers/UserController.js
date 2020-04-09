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

    static delete(req, res, next) {
        let id = req.params.id;
        User.findByPk(id)
            .then(data => {
                if(data) {
                    return User.destroy({
                        where: { id }
                    })
                } else {
                    return next(err)
                }
            })
            .then(result => {
                return res.status(200).json({
                    message : 'Success delete'
                })
            })
            .catch(err => {
                return next(err)
            })
    }
}


module.exports = UserController;