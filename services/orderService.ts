import OrderDAO from "../data_access/orderDAO";
import { userEnums } from "../utils/serviceEnums";

class UserService {
    private OrderDAO: OrderDAO;
    constructor() {
        this.OrderDAO = new OrderDAO();
    }

    async runServiceFunction(type: userEnums, req, res){
        return await this[userEnums[type]](req,res)
    }
    private async createOrder(req,res){
        const response = await this.OrderDAO.createOrder(req.body.content, req.body.orderedBy, req.body.location);
        return response;
    }
    private async getAllOrders(req, res) {
        const response = await this.OrderDAO.getAllOrders();
        return response;
    }
    private async getOrderById(req,res) {
        const response = await this.OrderDAO.getOrderById(req.params.id)
        return response;
    }
    private async getOrderByCourier(req,res) {
        const response = await this.OrderDAO.getOrderByCourier(req.params.id)
        return response;
    }
    private async assignOrder(req, res) {
        const response = await this.OrderDAO.assignOrder(req.body.id, req.body.courierId);
        return response;
    }
    private async updateOrderStatus(req,res){
        const response = await this.OrderDAO.updateOrderStatus(req.body.id, req.body.state)
        return response;
    }
    private async deleteOrderById(req,res){
        const response = await this.OrderDAO.deleteOrderById(req.params.id)
        return response;
    }
}

export default UserService;