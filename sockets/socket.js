const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket_controller');


// Mensajes de Sockets
io.on('connection', async (client) => {
    console.log('Cliente conectado');

    
    /// Autenticando Cliente por el Token enviado por cliente en el encabezado:
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    //console.log(valido, uid);

    if (!valido) {
        return client.disconnect();
    }

    console.log('Cliente autenticado');

    //await usuarioConectado(uid);
    usuarioConectado(uid);


    // Ingresando al usuario a una sala en particular.
    client.join(uid);

    //client.to(uid).emit('nombre del evento');

    // Escuchando mesajes del cliente el mensaje-personal
    client.on('mensaje-personal', async (payload) => {
        console.log(payload);

        // TODO: Grabar mensaje en la base de datos:
        await grabarMensaje(payload);

        // Enviando el mesaje al por el canal payload.para
        client.to(payload.para).emit('mensaje-personal', payload);
    });




    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

//    client.on('mensaje', ( payload ) => {
//        console.log('Mensaje', payload);
//
//        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
//
//    });


});
