import models from "../models";

export default {
    add: async (req,res, next) =>{
        try {
            const reg = await  models.Categoria.create(req.body);
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
            const reg = await models.Categoria.findOne({_id:req.query._id});
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
            const reg = await models.Categoria.find({});
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
            const reg = models.Categoria.findByIdAndUpdate({_id:req.body._id},{nombre:req.body.nombre, descripcion:req.body.descripcion});
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
            const reg = await models.Categoria.findByIdAndDelete({_id:req.body._id});
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
            const reg = models.Categoria.findByIdAndUpdate({_id:req.body._id}, {estado:1});
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
            const reg = models.Categoria.findByIdAndUpdate({_id:req.body._id}, {estado:0});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error);
        }
    }
}