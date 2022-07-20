const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        //await mongoose.connect( process.env.DB_CNN, {
        //    useNewUrlParser: true,
        //    useUnifiedTopology: true,
        //    useCreateIndex: true
        //});

        await mongoose.connect( process.env.DB_CNN);

        console.log('DB Online');
        

    } catch (error) {
        console.log('************** Inicio del mensaje de Error **************');
        console.log('Error en la conección de la base de datos:');
        console.log('');
        console.log(error);
        console.log('************** Fin del mensaje de Error **************');
        throw new Error('Error en la base de datos - Hable con el admin');
        
    }

}

module.exports = {
    dbConnection
}