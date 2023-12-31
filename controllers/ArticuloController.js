import models from "../models";

export default {
    add: async (req,res, next) =>{
        try {
            const reg = await  models.Articulo.create(req.body);
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
            const reg = await models.Articulo.findOne({_id:req.query._id})
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
            const reg = await models.Articulo.find({$or:[{'nombre': new RegExp(valor,'i')}]},{createdAt:0})
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
            const reg = await models.Articulo.findByIdAndUpdate({_id:req.body._id},{categoria:req.body.categoria, codigo:req.body.codigo, nombre:req.body.nombre, descripcion:req.body.descripcion, precio_venta:req.body.precio_venta, stock:req.body.stock, estado:req.body.estado});
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
            const reg = await models.Articulo.findByIdAndDelete({_id:req.body._id});
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
            const reg = await models.Articulo.findByIdAndUpdate({_id:req.body._id}, {estado:1});
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
            const reg = await models.Articulo.findByIdAndUpdate({_id:req.body._id}, {estado:0});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error);
        }
    }
}