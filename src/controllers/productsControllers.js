const db = require('../database/models');
const {validationResult} = require('express-validator')
const toThousand = require('../utils/toThousand');
const fs = require('fs')
const path = require('path');
const { productos } = require('../data/products_db');
/* Databases */
const Productos = db.Producto;
const Imagenes = db.Imagen;
const Talles = db.Talle;
const talleProducto = db.talles_producto;
const Categoria = db.Categoria;
const colorProducto = db.colores_producto;


module.exports = {

    index: (req, res) => {
        Productos.findAll()
            .then(productos => {
                Imagenes.findAll({
                    include: {association: "Producto"},
                    attributes: ['productoId', 'nombre'],
                    group: ['productoId']    
                })
                    .then(imagenes => {
                        return res.render('products', {
                            productos,
                            toThousand,
                            imagenes,
                            title: "Domino | Listado de Productos"
                    }).catch(error => {
                        console.log(error);
                    })
            })
        })
                .catch(error => {
                    console.log(error);
                })
    },

    detalle: (req, res) => {

        Productos.findByPk(req.params.id,{
            include: [{association: "Categoria"}, 
            {association: "Colores"}, 
            {association: "Genero"}, 
            {association:"Talles"}]
        }).then(producto => {
            Imagenes.findAll({
                include: {association: "Producto"},
                where: {productoId: req.params.id}
            }).then(imagenes => {
                return res.render('detalle.ejs', {
                    producto,
                    imagenes,
                    title: "Domino | " + producto.nombre
                })}).catch(error => console.log(error))
        })
    },
    createProduct: (req, res) => {
        Productos.findAll()
            .then(productos => {
                Talles.findAll()
                    .then(talles => {
                        Categoria.findAll()
                            .then(categorias => {
                                Imagenes.findAll()
                                    .then(imagenes => {
                                        return res.render("createProduct.ejs", {imagenes,productos, talles, categorias, title: "Domino | Creación de Producto"})
                                    })
                            })
                    })
            })
    },
    addProduct: async (req, res) => {
        let errors = validationResult(req)
        try {
           if(errors.isEmpty()) {
                let producto = await Productos.create({
                nombre: req.body.nombre,
                precio: req.body.precio,
                descripcion: req.body.descripcion,
                marca: "Domino",
                descuento: req.body.descuento,
                idCategoria: req.body.categoria,
                idGeneros: req.body.genero
                });

                if(typeof req.body.talle == "string"){ //Si lo que me viene por body es una sola cosa...
                    await talleProducto.create({ //Creame un solo registro de eso...
                        productoId: producto.id,
                        talleId: req.body.talle
                    })
                } else if (typeof req.body.talle == "object"){ //Si lo que me viene por body es + de una cosa...
                    let reqBodyArray = []; //Array vacío...
                    req.body.talle.forEach(t => { //Recorremos lo que viene por body
                        let talles = { //Asignamos una estructura de dato...
                            productoId: producto.id,
                            talleId: t
                        }
                        reqBodyArray.push(talles) //agregamos cada paquete al array vacío...
                    });
                    await talleProducto.bulkCreate(reqBodyArray, {validate: true})
                }

                let images = []; //Proceso simil pero con imagenes...
                if(req.files.length != 0){ // existe algo que me venga por body?
                    let imagenes = req.files.map(i=> i.filename);
                    imagenes.forEach(img => {
                        var image = {
                            nombre: img,
                            productoId: producto.id
                        }
                        images.push(image)
                        })
                    } else {
                        var image = {
                            nombre: "defaultimage.png",
                            productoId: producto.id
                        }
                        for (let i = 0; i < 4; i++) {
                            images.push(image)
                        }
                    }
                await Imagenes.bulkCreate(images, { validate: true })
                return res.redirect('/products') //Redirigimos al usuario a lista de productos...
            } else {
                Productos.findAll()
                    .then(productos => {
                Talles.findAll()
                    .then(talles => {
                        Categoria.findAll()
                            .then(categorias => {
                                /* return res.render("construction.ejs") */
                                return res.render("createProduct.ejs", {productos, talles, categorias, errors: errors.mapped(), old: req.body, title: "Domino | Creación de Producto"})
                            })
                    })
            })
            }
        } catch (error) {
            console.log(error);
        }
    },
    editProduct: (req, res) => {
        /* return res.render("construction.ejs") */
        Productos.findByPk(req.params.id, {
            include: [{association: "Categoria"}, 
            {association: "Colores"}, 
            {association: "Genero"}, 
            {association:"Talles"}]
        }).then(producto => {
                Talles.findAll()
                    .then(talles => {
                        Categoria.findAll()
                            .then(categorias => {
                                
                                Imagenes.findAll({
                                    where: {productoId: req.params.id}
                                }).then(imagenes => {
                                    return res.render("editProduct.ejs", {producto, talles, categorias, imagenes, title: "Domino | Edición de Producto"})
                                })
                            })
                    })
            })
    },
    edit : async (req, res) => {
        let errors = validationResult(req)

        try {
            if(errors.isEmpty()){
                let producto = await Productos.update({
                    nombre: req.body.nombre ? req.body.nombre : Productos.nombre,
                    precio: req.body.precio ? req.body.precio : Productos.precio,
                    descripcion: req.body.descripcion ? req.body.descripcion : Productos.descripcion,
                    descuento: req.body.descuento? req.body.descuento : Productos.descuento,
                    idCategoria: req.body.categoria ? req.body.categoria : Productos.idCategoria,
                    idGeneros: req.body.genero ? req.body.genero : Productos.idGeneros
                },
                {
                    where: {id: req.params.id}
                })
                if(typeof req.body.talle == "string"){ 
                    await talleProducto.update({
                        productoId: producto.id,
                        talleId: req.body.talle
                    },
                    {where: {productoId:req.params.id}})
                } else if (typeof req.body.talle == "object"){ 
                    talleProducto.destroy({
                        where: {productoId: req.params.id}
                    })

                    let arrayTalle = [];
                    let talles = req.body.talle;

                    talles.forEach(t => {
                        var talle = {
                            productoId: req.params.id,
                            talleId: t
                        }
                        arrayTalle.push(talle)
                    })

                    await talleProducto.bulkCreate(arrayTalle, {validate: true})
                }
                return res.redirect('/products/')
            } else {
                let producto = await Productos.findByPk(req.params.id, {
                    include: [{association: "Categoria"}, 
                    {association: "Colores"}, 
                    {association: "Genero"}, 
                    {association:"Talles"}]
                })
                let talles = await Talles.findAll();
                let categorias = await Categoria.findAll();

                return res.render("editProduct.ejs", 
                {producto, talles, categorias, errors: errors.mapped(), old: req.body, title: "Domino | Edición de Producto"})
            }
        } catch (error) {
            console.log(error)
            throw new Error('Ups...Algo salió mal, no toques nada!');
        }
    },

    destroy: async (req, res) => {

        try {
            await Imagenes.destroy({
                where: {productoId: req.params.id}
            })
            await talleProducto.destroy({
                where: {productoId: req.params.id}
            })
            await Productos.destroy({
                where: {id: req.params.id}
            })
            return res.redirect('/products/')
        } catch (err){
            console.log(err)
        }
        
    },

}