'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var pacienteSchema = Schema({
    nombre : String, 
    apellidos : String, 
    edad : String, 
    telefono : String, 
    direccion : String, 
    nacionalidad : String, 
    rut : String, 
    prevision : String, 
    categoria : String,
    estado : String
});



module.exports = mongoose.model('paciente', pacienteSchema);