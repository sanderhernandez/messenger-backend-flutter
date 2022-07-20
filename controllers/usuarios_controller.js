const { response } = require("express");
const Usuario = require('../models/usuario');

const getUsuarios = async (request, res = response) => {

    // Paginación de lista de usuarios:
    const desde = Number(request.query.desde) || 0;

    const usuarios = await Usuario
        .find({_id: {$ne: request.uid}})
        .sort('-online')
        .skip(desde)
        .limit(5);


    return res.status(200).json({
        ok: true,
        usuarios
    });
}

module.exports = {getUsuarios}