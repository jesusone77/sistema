import mongoose,{Schema} from "mongoose";

const usuarioSchema = new Schema({
    rol:{type:String, maxlenght:30, required:true},
    nombre:{type:String, maxlenght:50, unique:true, required:true},
    tipo_documento:{type:String, maxlenght:20},
    num_documento:{type:String, maxlenght:20},
    direccion:{type:String, maxlenght:70},
    telefono:{type:String, maxlenght:20},
    email:{type:String, maxlenght:50, unique:true, required:true},
    password:{type:String, maxlenght:64, required:true},
    estado: {type: Number, default: 1},
    createAt:{type:Date,default:Date.now},
});


const Usuario = mongoose.model('usuario', usuarioSchema);

export default Usuario;