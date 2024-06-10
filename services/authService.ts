import UserDAO from "../data_access/userDAO";
import { generateAuthToken, verifyToken } from "../utils/auth";
import config from '../config'

interface requestType {
    name: string;
    username: string;
    email: string;
    password: string;
    picture: string;
    app: string;
}
class AuthService {
    private UserDAO: UserDAO;
    constructor() {
        this.UserDAO = new UserDAO();
    }
    async verifyToken(req, res) {
        const verified = verifyToken(req.body.token);
        if (verified.state) {
            const response = await this.UserDAO.getUserByEmail(verified.data);
            if (response.isSuccessfullExecution && response.result)
                res.status(200).send(response.result[0]);
            else 
                res.status(500).send(response.errMessage);
        }else{
            res.status(500).send(verified.data)
        }
    }
    async loginWithUsername(req, res) {
        const response = await this.UserDAO.loginWithUsername(req.body.username, req.body.password);
        
        if (response.isSuccessfullExecution && response.result) {
            const token = generateAuthToken((Object(response.result[0])).email);
            res.status(200).header('x-auth-token', token).send(response.result[0])
        }else{
            res.status(500).send(response.errMessage)
        }
    }
    async loginWithEmail(req, res) {
        const response = await this.UserDAO.loginWithEmail(req.body.email, req.body.password);
        if (response.isSuccessfullExecution && response.result) {
            const token = generateAuthToken((Object(response.result[0])).email);
            res.status(200).header('x-auth-token', token).send(response.result[0])
        }else{
            res.status(500).send(response.errMessage)
        }
    }
}

export default AuthService;