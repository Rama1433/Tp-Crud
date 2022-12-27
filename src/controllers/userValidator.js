const {loadProducts} = require('../data/dbmodule')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { check } = require('express-validator');
const { validationResult } = require('express-validator');

module.exports[
    check('first_name')
          .notEmpty()

]



const validateRegister = [
    check('name').notEmpty().withMessage('Debes completar este campo').bail().isLength({min : 3}).withMessage('Debe incluir al menos 3 caracteres'),
    check('email').notEmpty().withMessage('Debes completar este campo').bail().isEmail().withMessage('Tienes que completar un email valido'),
    check('password').notEmp,
    check('password').notEmpty().withMessage('Debes completar este campo').bail().isNumeric({no_symbols: true}).withMessage('Debes colocar una contraseña númerica, sin simbolos'),
];

module.exports = [
    userController,
    validateRegister
]
