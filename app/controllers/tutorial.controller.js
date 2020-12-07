
const database = require('../models');
const Tutorial = database.tutorials;
const Op = database.sequelize.Op;

// new tutorial
exports.create = (request, response) => {
    const body = request.body;

    if (!body.title) {
        response.status(400).send({
            message: 'Content cannot be empty!'
        });

        return;
    }

    const tutorial = {
        title: body.title,
        description: body.description,
        published: (body.published ? body.published : false)
    };

    Tutorial.create(tutorial).then(data => response.send(data)).catch(error => { 
        response.status(500).send({
            message: error.message || 'Some error occurred while creating the tutorial!'
        });
    });
};

// update tutorial by id
exports.update = (request, response) => {
    const id = request.params.id;

    Tutorial.update(request.body, { where: { id: id } }).then(affectedRows => {
        if (affectedRows == 1) {
            response.send({ message: 'Tutorial was updated successfully! '});
        }
        else {
            response.send({
                message: `Cannot update tutorial with id ${id}. Maybe tutorial was not found request.body is empty!`
            });
        }
    }).catch(error => { 
        response.status(500).send({
            message: error.message || `Error updating tutorial with id ${id}`
        });
    });
};

// delete tutorial by id
exports.deleteById = (request, response) => {
    const id = request.params.id;

    Tutorial.destroy({ where: { id: id } }).then(affectedRows => {
        if (affectedRows == 1) {
            response.send({ message: 'Tutorial was deleted successfully! '});
        }
        else {
            response.send({
                message: `Cannot delete tutorial with id ${id}. Maybe tutorial was not found request.body is empty!`
            });
        }
    }).catch(error => { 
        response.status(500).send({
            message: error.message || `Could not delete tutorial with id ${id}`
        });
    });
};

// delete all tutorials
exports.deleteAll = (request, response) => {
    Tutorial.destroy({ where: {}, truncate: false }).then(affectedRows => {
        response.send({ message: `${affectedRows} tutorials were deleted successfully!` });
    }).catch(error => {
        response.status(500).send({
            message: error.message || 'Some error occurred while removing all tutorials.'
        });
    })
};

// find all tutorials
exports.findAll = (request, response) => {
    const title = request.query.title;
    const condition = (title ? { title: { [Op.like]: `%${title}%` } } : null);

    Tutorial.findAll({ where: condition }).then(data => response.send(data)).catch(error => {
        response.status(500).send({
           message: error.message || 'Some error occurred while retrieving tutorials!'
       })
    });
};

// find all published tutorials
exports.findAllPublished = (request, response) => {
    Tutorial.findAll({ where: { published: true } }).then(data => response.data).catch(error => {
        response.status(500).send({
            message: error.message || 'Some error occurred while retrieving tutorials.'
       })
    });
};

// find by id
exports.findOne = (request, response) => {
    const id = request.params.id;

    Tutorial.findByPk(id).then(data => response.send(data)).catch(error => {
        response.status(500).send({
            message: error.message || `Error retrieving tutorial with id ${id}`
       })
    });
};
