'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 4000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/urgencias', (err, res) => {
    if(err){
        throw err;
    }else{
        console.log("La conexion a la Base de datos se realizo correctamente...");
        app.listen(port, function(){
            console.log('El servidor del api rest de urgencias esta escuchando en http://localhost:'+port);
        });
    }
});
