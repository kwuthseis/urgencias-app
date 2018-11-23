'use strict'

var Paciente = require('../models/paciente.js');

var express = require('express');
var bodyParser = require ('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

function getPacientes(req, res){

    Paciente.find((err, paciente) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!paciente){
                res.status(500).send({message: 'No existen pacientes'});
            }else{
                    res.status(200).send({paciente});
            }
 
        }
    });
}


function savePaciente(req, res){
    var params = req.body;
    var paciente = new Paciente();

    console.log(req);
    console.log(params);

    paciente.nombre         = params.nombre; 
    paciente.apellidos      = params.apellidos; 
    paciente.edad           = params.edad; 
    paciente.telefono       = params.telefono; 
    paciente.direccion      = params.direccion; 
    paciente.nacionalidad   = params.nacionalidad; 
    paciente.rut            = params.rut; 
    paciente.prevision      = params.prevision; 
    paciente.categoria      = 'null';
    paciente.estado         = '0';

    // Validacion de campos obligatorios
    if(paciente.nombre != null && paciente.apellidos != null && paciente.rut != null){
        // Guardar el paciente
        paciente.save((error, pacienteStored) => {
            if(error){
                res.status(500).send({message: 'Error al guardar el paciente'});
            }else{
                if(!pacienteStored){
                    res.status(404).send({message: 'No se ha registrado el paciente'});
                }else{
                    res.status(200).send({user: pacienteStored});
                }
            }
        });

    }else{
        res.status(200).send({message: 'Faltan datos obligatorios por ingresar'});
    }
    
}

function updateCategoria(req, res){
    var pacienteId = req.params.id;
    var update = req.body;


    Paciente.findByIdAndUpdate(pacienteId, {categoria: update.categoria}, (err, pacienteUpdated) =>{
        if(err){
            res.status(500).send({message: 'Error al actualizar categoria paciente'});
        }else{
            if(!pacienteUpdated){
                res.status(404).send({message: 'No se ha podido actualizar categoria del paciente'});
            }else{
                res.status(500).send({user: pacienteUpdated, categoria: update.categoria});
            }
        }
    });
}

function deletePaciente(req, res){
    var pacienteId = req.params.id;


    Paciente.findByIdAndRemove(pacienteId, (err, pacienteDelete) => {
        if(err){
            res.status(500).send({message: 'Error al borrar al paciente'});
        }else{
            if(!pacienteDelete){
                res.status(404).send({message: 'No se ha podido borrar el paciente'});
            }else{
                res.status(500).send({user: pacienteDelete, message: 'Paciente borrado exitosamente'});
            }
        }
    });
}

module.exports = {
    getPacientes,
    savePaciente,
    updateCategoria,
    deletePaciente

}


