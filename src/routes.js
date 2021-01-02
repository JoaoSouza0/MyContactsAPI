const { Router } = require('express');
const contactController = require('./app/controller/contactController');

const routes = Router();

routes.get('/contacts', contactController.index);
routes.get('/contacts/:id', contactController.show);
routes.delete('/contacts/:id', contactController.delete);
routes.post('/contacts', contactController.store);
routes.put('/contacts/:id', contactController.update);

module.exports = routes;
