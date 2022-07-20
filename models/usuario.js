const {schema, model, Schema} = require('mongoose');

// Crea la tabla si no exite
const UsuarioSchema = Schema({
    
    nombre:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true,
    },
    online:{
        type: Boolean,
        default: false,
    },
    
});

UsuarioSchema.method('toJSON', function() {
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Usuario', UsuarioSchema);