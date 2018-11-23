'use strict'

var express = require('express');
var PacienteController = require('../controllers/paciente');


var api = express.Router();

api.get('/pacientes', PacienteController.getPacientes);
api.post('/pacientes', PacienteController.savePaciente);
api.put('/pacientes/:id', PacienteController.updateCategoria);
api.delete('/pacientes/:id', PacienteController.deletePaciente);

module.exports = api;