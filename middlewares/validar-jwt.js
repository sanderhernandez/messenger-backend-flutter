const { response } = require('express');
const jwt = require('jsonwebtoken');



const validarJWT = (request, res = response, next) => {

    // Leer token:
    const token = request.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok:false,
            msg: 'No hay token en la peticion'
        });
        
    } else {
        
    }



    try {


        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        request.uid = uid;


        next();
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'token no valido'
        });
    }


    //const errores = validationResult(request);

    //if(!errores.isEmpty()){
    //    return res.status(400).json({
    //        ok:false,
    //        errors:errores.mapped()
    //    });
    //}

    
}

module.exports = {validarJWT}