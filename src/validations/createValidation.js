const {body,check} = require('express-validator');

module.exports = [
    body("nombre")
        .notEmpty().withMessage("¡Debes poner el nombre del producto!")
        .isLength({min:2,max:100}).withMessage("Debe tener entre 2 y 100 caractéres."),
    check("descripcion")
        .notEmpty().withMessage("¡Debes escribir algo sobre el producto!")
        .isLength({max:200}).withMessage("¡La descripción es muy larga!"),
    check('descuento')
        .notEmpty().withMessage("¡Poné un descuento al producto!")
        .isNumeric().withMessage("Debe ser un numero")
        ,
    check("categoria")
        .notEmpty().withMessage("Debes seleccionar una categoria."),
    check("talle")
        .notEmpty().withMessage("Selecciona al menos un (1) talle."),
    check("genero")
        .notEmpty().withMessage("Selecciona un género."),
    check("precio")
        .notEmpty().withMessage("Debes poner algún precio.")
        .isNumeric().withMessage("Debe ser un numero"),
]