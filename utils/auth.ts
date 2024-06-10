import jwt from 'jsonwebtoken';
import MessageHandler from './general/messageHandler';
import config from '../config'

export const generateAuthToken = (email: string) => {
    const token = jwt.sign({ email: email },  config.JWT_PRIVATE_KEY);
    return token;
}
export const verifyToken = (token: string) => {
    const decoded = jwt.decode(token);
    if (!decoded) {
        return { state: false, data: 'invalid token'};
    }
    if ((Number(decoded.iat + '000') + 9000000) > Date.now() ){

        return { state: true, data: decoded.email };
    } else {
        return { state: false, data: 'invalid token'};
    }
}
export const serverAuth = (req,) => {
    const messageHandler = new MessageHandler();
    const token = req.header('x-auth-token');
    if (!token) 
        return messageHandler.RequestControllerMessage(true, 'Access Denied: No token proived', 401);

    try {
        const decoded = jwt.verify(token, config.JWT_PRIVATE_KEY);
        req.user = decoded;
        return messageHandler.RequestControllerMessage(false);
    } catch {
        return messageHandler.RequestControllerMessage(true, 'Invalid Token', 400);
    }
};