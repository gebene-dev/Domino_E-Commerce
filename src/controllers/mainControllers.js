const fs = require('fs');
const path = require('path');
const {productos} = require('../data/products_db');
const toThousand = require('../utils/toThousand');
const db = require("../database/models");
const Op = db.Sequelize.Op;
const Productos = db.Producto;
const Imagenes = db.Imagen;

module.exports = {
    index : (req, res) => {
        res.render('home', {
            productos,
            principales : productos.filter(producto => producto.seccion === "principal"),
            /* ----- carrusel ----- */
            seleccionados1 : productos.filter(producto => producto.seccion === "seleccionado1"),
            seleccionados2 : productos.filter(producto => producto.seccion === "seleccionado2"),
            seleccionados3 : productos.filter(producto => producto.seccion === "seleccionado3"),
            destacados : productos.filter(producto => producto.seccion === "destacado"),
            /* destacados2 : productos.filter(producto => producto.seccion === "destacado2"),
            destacados3 : productos.filter(producto => producto.seccion === "destacado3"), */
            toThousand, title: "Domino | Home"
        });
    },
    search : (req, res) => {
            let buscador = req.query.buscador.trim();

            Productos.findAll({
                where: {[Op.or] : [{nombre: {[Op.substring] : buscador.toLowerCase()}}]}
            }).then(productos => {
                let array = [];
                for (let i = 0; i < productos.length; i++) {
                    var productoId = productos[i].id;
                    array.push(productoId)
                }
                Imagenes.findAll({
                    where: { productoId : array},
                    attributes: ['productoId', 'nombre'],
                    group: ['productoId'],
                    include: [{association: "Producto"}]
                })
                    .then(imagenes => {
                        return res.render("results.ejs", {imagenes, productos, buscador : req.query.buscador.trim(), title: "Domino | Resultados de: " + buscador})
                    }) 
            })
    },
    categories: (req,res) => {
        let filtro = req.query.filtro
        let genero = req.query.genero

        Productos.findAll({
            where: {
                idCategoria :{
                    [Op.eq]: [filtro]
                },
                idGeneros: {
                    [Op.eq]: [genero]
                }
            },
            include: [
                {association: "Categoria"},
                {association: "Genero"}
            ]
        }).then(productos => {
            let array = [];
            for (let i = 0; i < productos.length; i++) {
                var productoId = productos[i].id;
                array.push(productoId)
            }
            Imagenes.findAll({
                where: { productoId : array},
                attributes: ['productoId', 'nombre'],
                group: ['productoId'],
                include: [{association: "Producto"}]
            })
                .then(imagenes => {
                    return res.render("categoryResults.ejs", {imagenes, productos, filtro : req.query.filtro, genero: req.query.genero ,title: "Domino | Categoria: Resultados" })
                }) 
        })
    },
    prueba: (req,res) => {
        Imagenes.findAll()
        .then(imagenes => {
            return res.json(imagenes)
        })
    },
    descuentosCategory: (req,res) => {

        let descuento = req.query.descuento; 

        Productos.findAll({
            where: {
                descuento : {[Op.eq]: [descuento]}
            }
        }).then(productos => {
            let array = [];
            for (let i = 0; i < productos.length; i++) {
                var productoId = productos[i].id;
                array.push(productoId)
            }
            Imagenes.findAll({
                where: { productoId : array},
                attributes: ['productoId', 'nombre'],
                group: ['productoId'],
                include: [{association: "Producto"}]
            })
                .then(imagenes => {
                    return res.render("resultDescuentos.ejs", {imagenes, productos, descuento: req.query.descuento ,title: "Domino | Descuentos del " + descuento + "%"})
                }) 
        })
    }
}
