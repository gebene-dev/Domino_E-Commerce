const {body} = require('express-validator');
const db = require("../database/models");
const bcrypt = require('bcryptjs');
const Usuarios = db.Usuario;

module.exports = [
    body('password')
    .custom((value,{req}) => {
        return Usuarios.findOne({
            where: {email:req.body.email}
        }).then(usuario => {
            if(!bcrypt.compareSync(value,usuario.dataValues.password)){
                return Promise.reject("¡Contraseña incorrecta!")
            }
        }).catch( () => {return Promise.reject('¡Credenciales inválidas!')})
    })
]