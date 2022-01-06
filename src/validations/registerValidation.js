const {body, check} = require('express-validator')

module.exports = [
    body('nombre')
        .notEmpty().withMessage('Debes poner tu nombre.')
        .isLength({min: 2,max: 60})
        .isAlpha().withMessage('El nombre debe contener solo letras.'),
    body('apellido')
        .notEmpty().withMessage('Debes poner tu apellido.')
        .isAlpha().withMessage('El apellido debe contener solo letras.'),
    body('email')
        .isEmail().withMessage('Debes poner tu email.'),
    body('password')
        .isLength({min: 6, max: 15}).withMessage('La contraseña debe tener entre 6 y 15 caracteres.'),
    check('terminos')
        .isString('on').withMessage('Debes aceptar los términos y condiciones')
];