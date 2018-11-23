'use strict'

var express = require('express');
var bodyParser = require ('body-parser');

var app = express();

// cargar rutas
var paciente_rutas = require('./routes/paciente');
var usuario_rutas = require('./routes/usuario');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// Configurar cabeceras http



// rutas base
app.use('/api', paciente_rutas);
app.use('/api', usuario_rutas);

app.get('/pruebas', function(req,res){
    res.status(200).send({message: 'Bienvenidos a Urgencias.'});
});

module.exports = app;
