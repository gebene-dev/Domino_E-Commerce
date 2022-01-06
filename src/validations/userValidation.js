const {body, check} = require('express-validator');

module.exports = [
    check('nombre')
        .notEmpty().withMessage('¡Debes poner tu nombre!')
        .isLength({min: 2, max: 50}).withMessage('¡Debe contener entre 2 y 50 caractéres!'),
    check('apellido')
        .notEmpty().withMessage('¡Debes poner tu apellido!')
        .isLength({min: 2, max: 50}).withMessage('¡Debe contener entre 2 y 50 caractéres!'),
    check('email')
        .notEmpty().withMessage('¡Debes rellenar el campo!').isEmail().withMessage('¡Debe ser un email válido!')
];