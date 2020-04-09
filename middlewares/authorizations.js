const { Task } = require('../models');

 function authorization(req, res, next) {
     console.log(req.params.id)
    Task.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(result => {
            if(result) {
                if(result.UserId == req.decoded.id) {
                    return next()
                } else {
                    return next({
                        name: 'Unauthorized',
                        errors: { message: 'User not authorized'}
                    })
                }
            } else {
                return next({
                    name: 'NotFound',
                    errors: { message: 'User Not Found'}
                })
            }
        })
        .catch(err => {
            return next(err)
        })
}


module.exports = authorization;