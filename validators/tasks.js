const {
    check
} = require('express-validator');

const { validateResult } = require('../utils/validator');

const validateCreate = [

    check('nombre').exists().not().isEmpty(),
    check('descripcion').exists().not().isEmpty(),
    check('estado').exists().isIn(['pendiente', 'en progreso', 'completada']),
    check('proyecto_id').exists(),
    check('asignado').exists(),
    ( req , res, next ) => {
        validateResult(req , res, next)
    }
]

module.exports = {
    validateCreate,
}