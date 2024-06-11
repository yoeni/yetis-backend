import UserDAO from "../data_access/userDAO";
import { userEnums } from "../utils/serviceEnums";

class UserService {
    private UserDAO: UserDAO;
    constructor() {
        this.UserDAO = new UserDAO();
    }

    async runServiceFunction(type: userEnums, req, res){
        return await this[userEnums[type]](req,res)
    }
    private async getAllUsers(req, res) {
        const response = await this.UserDAO.getAllUsers();
        return response;
    }
    private async getUsersByType(req,res) {
        const response = await this.UserDAO.getUsersByType(req.params.type)
        return response;
    }
    private async getUserById(req,res) {
        const response = await this.UserDAO.getUserById(req.params.id)
        return response;
    }
    private async getUserByEmail(req,res) {
        const response = await this.UserDAO.getUserByEmail(req.params.email)
        return response;
    }
    private async getUserByUsername(req,res) {
        const response = await this.UserDAO.getUserByUsername(req.params.username)
        return response;
    }
    private async addUser(req,res){
        const response = await this.UserDAO.addUser(req.body.username,req.body.email,req.body.password, req.body.userType, req.body.name, req.body.location);
        return response;
    }
    private async updateUserLocation(req, res) {
        const response = await this.UserDAO.updateUserLocation(req.body.id, req.body.location);
        return response;
    }
    private async updatePasswordUserByToken(req,res){
        const response = await this.UserDAO.updatePasswordUserByToken(req.body.newPassword, req.body.id)
        return response;
    }
    private async updatePasswordUserById(req,res){
        const response = await this.UserDAO.updatePasswordUserById(req.body.oldPassword, req.body.newPassword, req.body.id)
        return response;
    }
    private async updatePasswordUserByEmail(req,res){
        const response = await this.UserDAO.updatePasswordUserByEmail(req.body.oldPassword, req.body.newPassword, req.body.email)
        return response;
    }
    private async updatePasswordUserByUsername(req,res){
        const response = await this.UserDAO.updatePasswordUserByUsername(req.body.oldPassword, req.body.newPassword, req.body.username);
        return response;
    }
    private async deleteUserById(req,res){
        const response = await this.UserDAO.deleteUserById(req.params.id)
        return response;
    }
    private async deleteUserByEmail(req,res){
        const response = await this.UserDAO.deleteUserByEmail(req.params.email)
        return response;
    }
    private async deleteUserByType(req,res){
        const response = await this.UserDAO.deleteUserByType(req.params.type)
        return response;
    }
    private async deleteUserByUsername(req,res){
        const response = await this.UserDAO.deleteUserByUsername(req.params.username)
        return response;
    }
}

export default UserService;