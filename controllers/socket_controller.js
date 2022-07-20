const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');


const usuarioConectado = async (uid = '') => {

    // Buscando el usuario en la base de datos por el uid:
    const usuario = await  Usuario.findById(uid);

    // modificando el campo online a true:
    usuario.online = true;

    // guardando los cambios en la base de datos:
    await usuario.save();

    // retornando todos los datos del usuario
    return usuario;
}

const usuarioDesconectado = async (uid = '') => {

    // Buscando el usuario en la base de datos por el uid:
    const usuario = await  Usuario.findById(uid);

    // modificando el campo online a true:
    usuario.online = false;

    // guardando los cambios en la base de datos:
    await usuario.save();

    // retornando todos los datos del usuario
    return usuario;
}

const grabarMensaje = async (payload) => {

    try {
        // Creando Instancia:
        const mensaje = Mensaje(payload);

        // Grabando en la base de datos:
        await mensaje.save();

        return true;
    } catch (error) {
        return false;
    }

}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}