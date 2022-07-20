/*
    path: /api/login

*/

const {Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth_controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

//crear usuario
router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty().isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
],crearUsuario);

// Login
router.post('/', [
    check('email', 'El email es obligatorio').not().isEmpty().isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
],login);

// Login
// validarJWT
router.get('/renew', validarJWT, renewToken);




module.exports = router;