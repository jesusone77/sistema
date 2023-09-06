import models from "../models";
import bcrypt from "bcryptjs";
import token from '../services/token';

export default {
    add: async (req,res, next) =>{
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const reg = await  models.Usuario.create(req.body);
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error);
        }
    },
    query: async (req, res, next) =>{
        try {
            const reg = await models.Usuario.findOne({_id:req.query._id})
            .populate('categoria',{nombre:1});
            if(!reg) {
                res.status(404).send({
                    message:'El registro no existe'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error);
        }
    },
    list: async (req,res, next) => {
        try {
            let valor=req.query.valor;
            const reg = await models.Usuario.find({$or:[{'nombre': new RegExp(valor,'i')}, {'email': new RegExp(valor,'i')}]},{createdAt:0})
            .populate('categoria',{nombre:1})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            let pas = req.body.password;
            const reg0 = await models.usuario.findOne({_id:req.body._id});
            if (pas!=reg0.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{rol:req.body.rol, nombre:req.body.nombre, tipo_documento:req.body.tipo_documento, num_documento:req.body.num_documento, direccion:req.body.direccion, telefono:req.body.telefono,email:req.body.email,password:req.body.password,});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error);
        }
    },
    activate: async (req,res,next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id}, {estado:1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error);
        }
    },
    desactivate: async (req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id}, {estado:0});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            let user = await models.Usuario.findOne({email:req.body.email});
            if (user) {
                let match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    let tokenReturn = await token.encode(user._id);
                    res.status(200).json({user, tokenReturn});
                } else { 
                    res.status(404).send({
                        message: 'Password Incorrecto'
                    });
                }
            } else {
                res.status(404).send({
                    message: 'No existe el usuario'
                });
            }
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error);
        }
    }
}