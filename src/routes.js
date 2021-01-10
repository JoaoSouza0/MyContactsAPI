const { Router } = require('express');
const contactController = require('./app/controller/contactController');
const categoryController = require('./app/controller/categoryController');

const routes = Router();

routes.get('/contacts', contactController.index);
routes.get('/contacts/:id', contactController.show);
routes.delete('/contacts/:id', contactController.delete);
routes.post('/contacts', contactController.store);
routes.put('/contacts/:id', contactController.update);

routes.get('/categories', categoryController.index);
routes.get('/categories/:id', categoryController.show);
routes.delete('/categories/:id', categoryController.delete);
routes.post('/categories', categoryController.store);
routes.put('/categories/:id', categoryController.update);

module.exports = routes;
