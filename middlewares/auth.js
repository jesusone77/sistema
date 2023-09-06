import tokenService from '../services/token';

export default {
    verifyUsuario: async (req,res,next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'no token'
            })
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.rol == 'administrador' || response.rol == 'Vendedor' || response.rol == 'Almacenero') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
        });
        }
    },
    verifyAdministrador: async  (req,res,next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'no token'
            })
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.rol == 'administrador') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
        });
        }
    },
    verifyAlmacenero: async (req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'no token'
            })
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.rol == verifyAdministrador || response.rol == 'Almacenero') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
        });
        }
    },
    verifyVendedor: async (req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'no token'
            })
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.rol == verifyAdministrador || response.rol == 'Vendedor') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
        });
        }
    }

}