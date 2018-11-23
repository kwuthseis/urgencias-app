'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');


var api = express.Router();

api.post('/registrar', UsuarioController.saveUser);
api.post('/login', UsuarioController.loginUser);
api.put('/actualizar-usuario/:id', UsuarioController.updateUser);

module.exports = api;