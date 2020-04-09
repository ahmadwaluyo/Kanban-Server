const { Task } = require('../models');

class TaskController {
    static findAll(req, res, next) {
        Task.findAll({
            where: {
                UserId : req.decoded.id
            },
            order: [['updatedAt']]
        })
            .then(tasks => {
                if(tasks) {
                    return res.status(200).json(tasks)
                } else {
                    return next({
                        name: 'NotFound',
                        errors: { message: 'User Not Found '}
                    })
                }
            })
            .catch(err => {
                return next(err)
            })
    }

    static create(req, res, next) {
        let { title, category } = req.body;
        console.log(req.body)
        let payload = { title, category, UserId : req.decoded.id };
        Task.create(payload)
            .then(newTask => {
                if(newTask) {
                    return res.status(201).json(newTask);
                } else {
                    return next({
                        name: 'BadRequest',
                        errors: { message: 'Invalid Input' }
                    })
                }
            })
            .catch(err => {
                return next(err)
            })
    }

    static update(req, res, next) {
        let { id } = req.params;
        let { title, category } = req.body;
        let payload = {
            title,
            category
        }
        Task.update(payload, {
            where: {
                id
            },
            returning: true
        })
            .then(updatedTask => {
                return res.status(200).json(updatedTask[1][0])
            })
            .catch(err => {
                return next(err)
            })
    }

    static delete(req, res, next) {
        let { id } = req.params;
        Task.findByPk(id)
            .then(deleted => {
                if(deleted) {
                    return Task.destroy({
                        where: { id }
                    })
                } else {
                    return next({
                        name: 'NotFound',
                        errors: { message: 'Task Not Found'}
                    })
                }
            })
            .then(result => {
                return res.status(200).json({
                    message: 'Successfully delete task'
                })
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = TaskController;