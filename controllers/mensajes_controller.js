const { request, response } = require("express");
const Mensaje = require('../models/mensaje');


const obtenerChat =  async(request, res = response) => {
    const miId = request.uid;
    const mensajesDe = request.params.de;


    const last30 = await Mensaje.find({$or:[{de: miId, para:mensajesDe},{de: mensajesDe, para: miId}]})
    .sort({createdAt: 'desc'})
    .limit(30);

    return res.json({

        ok:true,
        mensajes: last30
    });




}



module.exports = {
    obtenerChat
}