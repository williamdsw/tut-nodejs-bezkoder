
module.exports = app => {
    const controller = require('../controllers/tutorial.controller.js');
    const router = require('express').Router();

    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.deleteById);
    router.delete('/', controller.deleteAll);
    router.get('/', controller.findAll);
    router.get('/published', controller.findAllPublished);
    router.get('/:id', controller.findOne);

    app.use('/api/tutorials', router);
};
