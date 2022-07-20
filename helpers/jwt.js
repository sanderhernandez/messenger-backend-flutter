const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        
        const payload = {uid};

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '12h',
        }, (err, token) => {
            
            if (err) {
                // no se pudo crear el token.
                reject('No se pudo generar el JWT');
            }else{
                // Token!
                resolve(token);
            }

        });

    });


}

const comprobarJWT = (token = '') =>{
    try {


        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        //request.uid = uid;

        return [true, uid];

    } catch (error) {
        
        return [false, null];

        //return res.status(401).json({
        //    ok:false,
        //    msg: 'token no valido'
        //});
    }
}


module.exports = {
    generarJWT,
    comprobarJWT
}