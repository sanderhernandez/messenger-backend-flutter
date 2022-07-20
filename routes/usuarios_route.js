/*
    path: /api/usuarios

*/

const {Router} = require('express');
const { getUsuarios } = require('../controllers/usuarios_controller');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

// Usuarios
router.get('/', validarJWT, getUsuarios);




module.exports = router;