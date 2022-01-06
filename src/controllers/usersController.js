const db = require("../database/models");
const Op = db.Sequelize.Op;
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
let Usuarios = db.Usuario;

module.exports = {
    login : (req, res) => {
        res.render('login.ejs', {title: "Domino | Inicio de Sesión"});
    },
    register : (req, res) => {
        res.render('register.ejs', {title: "Domino | Registro"});
    },
    processRegister : (req, res) => {
        let errors = validationResult(req);
        let {nombre,apellido,email,password,birthday} = req.body;

        if(errors.isEmpty()){
            Usuarios.create({
                nombre,
                apellido,
                email,
                password : bcrypt.hashSync(password,10),
                birthday,
                rol: "User",
                avatar: "default-profile-image.jpg"
            })
            .then( () => {
                res.redirect('/users/login');
            })
        } else {
            res.render('register',{errors : errors.mapped(), old: req.body, title: "Domino | Registro"})
        }
    },
    processLogin : (req, res) => {
        let errors = validationResult(req)
        console.log(errors);
        const {recordar} = req.body;
        if(errors.isEmpty()){
            Usuarios.findOne({
                where: {
                    email: req.body.email
                 }
            })
            .then(usuario => {
                    req.session.userLogin = {
                        id: usuario.id,
                        nombre: usuario.nombre,
                        apellido: usuario.apellido,
                        email: usuario.email,
                        avatar: usuario.avatar,
                        rol: usuario.rol
                    }
                    req.session.cart = [];

                db.Orden.findOne({
                        where : {
                            userId : req.session.userLogin.id,
                            status : 'pending'
                        },
                        include : [
                            {association : 'carts',
                                include : [
                                    {association : 'product',
                                        include : ['Categoria']
                                    }
                                ]
                            }
                        ]
                    })
                    .then(order => {
                        if(order){
                            order.carts.forEach(item => {
                                let product = {
                                    id : item.productId,
                                    nombre: item.product.nombre,
                                    categoria : item.product.Categoria.nombre,
                                    cantidad : item.quantity,
                                    precio : item.product.precio,
                                    total : item.product.precio * item.quantity,
                                    orderId : order.id
                                }
                                req.session.cart.push(product)
                            });
                        }})

                    if(recordar){
                        res.cookie('dominoCookie', req.session.userLogin, {
                            maxAge: 1000*180
                        })
                    }
                    return res.redirect('/')
            })
            .catch(error => {
                console.log(error);
            })
        } else {
            return res.render('login.ejs', {errors: errors.mapped(), old: req.body, title: "Domino | Inicio de Sesión"})
        } 
    },
    logout : (req,res) => {
        req.session.destroy();
        res.cookie('dominoCookie',null,{maxAge:-1})
        return res.redirect('/');
    },
    profileUser : (req,res) => {

        Usuarios.findByPk(req.session.userLogin.id)
        .then(user => {
            return res.render("profileUser.ejs", {user, title: "Domino | Mi Perfil"})
        })
    },
    profileUserChanges: (req, res) => {
        let errors = validationResult(req)       
        if(errors.isEmpty()){
            Usuarios.update({
                nombre: req.body.nombre ? req.body.nombre : null,
                apellido: req.body.apellido ? req.body.apellido : null,
                password: req.body.password ? bcrypt.hashSync(req.body.password, 10) : Usuarios.password,
                email:  req.body.email ? req.body.email : null,
                avatar: req.file ? req.session.userLogin.avatar = req.file.filename : req.session.userLogin.avatar,
            }, {
                where: {id: req.session.userLogin.id}
            }).then( () => {
                return res.redirect('/users/miperfil')
            })
                .catch(error => {
                    console.log(error);
                })
        } else {
            Usuarios.findByPk(req.session.userLogin.id)
                .then(user => {
                    return res.render("profileUser.ejs", {user,errors: errors.mapped(), old: req.body, title: "Domino | Mi Perfil"})
                })
        }
    }
}