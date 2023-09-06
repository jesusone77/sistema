import jwt from 'jsonwebtoken';
import models from '../models';

export default {
    encode: async (_id) => {
        const token = jwt.sign({_id:_id}, 'clavesecreparagenerartoken', {expiresIn: '1d'});
        return token;
    }, 
    decode: async (token) => {
        try {
            const {_id} = await jwt.verify(token, 'clavesecreparagenerartoken');
            const user = await models.Usuario.findOne({_id, estado:1});
            if (user) {
                return user;
            } else {
                return false;
            }
        } catch (error) {

        }
    }
}