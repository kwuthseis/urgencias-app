'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/usuario');




function saveUser(req, res){
    var user = new User();
    var params = req.body;

    console.log(params);
    
    user.nombre = params.nombre;
    user.apellidos = params.apellidos;
    user.email = params.email;
;
    if(params.password){
        // Encriptar Contraseña y guardar dato
        bcrypt.hash(params.password, null, null, function(err, hash){
            if(err){
                throw err;
            }
            
            user.password = hash;
            
            if(user.nombre != null && user.apellidos != null && user.email != null && user.password != null){
                
                // Guardar el usuario
                user.save((error, userStored) => {
                    if(error){
                        res.status(500).send({message: 'Error al guardar el usuario'});
                    }else{
                        if(!userStored){
                            res.status(404).send({message: 'No se ha registrado el usuario'});
                        }else{
                            res.status(200).send({user: userStored});
                        }
                    }
                });
                
            }else{
                res.status(200).send({message: 'Rellene todos los campos'});
            }

        });
    }else{
        res.status(200).send({message : 'Introduce la contraseña'});
    }
}

function loginUser(req, res){   
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()},(err, user) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!user){
                res.status(500).send({message: 'El usuario no existe'});
            }else{
                
                // Comprobar la contraseña
                bcrypt.compare(password, user.password, (err, check) => {
                    if(check){
                        res.status(200).send({user, message: 'Usuario logeado correctamente'});
                        
                    }else{
                        res.status(500).send({message: 'El usuario no ha podido loguearse'});    
                    }
                });
            }
        }
    });
}

function updateUser(req,res){
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdated) =>{
        if(err){
            res.status(500).send({message: 'Error al actualzar usuario'});
        }else{
            if(!userUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el usuario'});
            }else{
                res.status(500).send({user: userUpdated});
            }
        }
    });

}

module.exports = {
    saveUser,
    loginUser,
    updateUser
};