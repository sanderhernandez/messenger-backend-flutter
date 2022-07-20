/*
    path: /api/mensajes

*/

const {Router} = require('express');
const { obtenerChat } = require('../controllers/mensajes_controller');

const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

// Usuarios
router.get('/:de', validarJWT, obtenerChat);




module.exports = router;