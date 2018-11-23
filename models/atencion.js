'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var atencionSchema = Schema({
    diagnostico : String, 
    doctor : String, 
    indicacion : String, 
    estado : String, 
    fecha_ingreso : String, 
    fecha_alta: String
});



module.exports = mongoose.model('atencion', atencionSchema);