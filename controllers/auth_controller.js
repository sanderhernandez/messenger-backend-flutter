const { response } = require("express");
const bcrypt = require('bcryptjs');
//const { validationResult } = require("express-validator");

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async(request, res = response) => {

    const {email, password} = request.body;

    try {

        const existeEmail = await Usuario.findOne({email: email});

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El Correo electrónico ya existe!'
            });
        }

        const usuario = new Usuario(request.body); // Agrega los datos de la solicitud del usuario al modelo Usuario.

        // Ecriptar contraseña:
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        
        await usuario.save(); // Guarda el registro en la base de datos.

        // Generar mi JWT:
        const token = await generarJWT(usuario.id);




        // Envia un json al usuario:
        res.json({
            ok: true,
            usuario,
            token,
            msg: 'Usuario creado exitosamente!'
        });
        
    } catch (error) {
        console.log(error);
        // Envia un json al usuario:
        res.status(500).json({
            ok: false,
            //body: request.body,
            msg: 'Hable con el Administrador de sistemas'
        });
    }

    
}


const login = async(request, res = response) => {

    const {email, password} = request.body;

    try {

        // Validar el email:
        const usuarioDB = await Usuario.findOne({email: email});

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Credenciales incorrectas!'
            });
        }


        // Validar(Match) el password:
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas!'
            });
        }




        //const usuario = new Usuario(request.body); // Agrega los datos de la solicitud del usuario al modelo Usuario.

        // Ecriptar contraseña:
        //const salt = bcrypt.genSaltSync();
        //usuario.password = bcrypt.hashSync(password, salt);
        
        //await usuario.save(); // Guarda el registro en la base de datos.

        // Generar mi JWT:
        const token = await generarJWT(usuarioDB.id);




        // Envia un json al usuario si pasa las validaciones:
        res.json({
            ok: true,
            usuario: usuarioDB,
            token,
            //msg: 'Usuario creado exitosamente!'
        });
        
    } catch (error) {
        console.log(error);
        // Envia un json al usuario:
        res.status(500).json({
            ok: false,
            //body: request.body,
            msg: 'Hable con el Administrador de sistemas'
        });
    }

    
}

const renewToken = async(request, res = response) => {

    const uid = request.uid;

    const token = await generarJWT(uid);
    const usuarioDB = await Usuario.findById(uid);

    
    res.json({
        ok: true,
        usuario: usuarioDB,
        token,
    });
}



module.exports = {crearUsuario, login, renewToken}