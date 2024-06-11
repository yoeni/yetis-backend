import axios from "axios";
import OrderDAO from "../data_access/orderDAO";
import { orderEnums } from "../utils/serviceEnums";
import { v4 as uuidv4 } from 'uuid';
import UserDAO from "../data_access/userDAO";

class OrderService {
    private OrderDAO: OrderDAO;
    private UserDAO: UserDAO;
    constructor() {
        this.OrderDAO = new OrderDAO();
        this.UserDAO = new UserDAO();
    }

    async runServiceFunction(type: orderEnums, req, res){
        return await this[orderEnums[type]](req,res)
    }
    private fetchRandomUsers = async () => {
        const response = await axios.get('https://randomuser.me/api/?nat=tr&results=10');
        return response.data.results;
    };
    private async createFakeOrders(req, res) {
        const users = await this.fetchRandomUsers();

        for (let user of users) {
            const username = user.login.username;
            const email = user.email; 
            const password = uuidv4();  // Rastgele bir şifre oluştur
            const name = `${user.name.first} ${user.name.last}`;
            const location = `${user.location.coordinates.latitude}, ${user.location.coordinates.longitude}`;
            const userType = 2;  

            const registeredUser = await this.UserDAO.addUser(username, email, password, userType, name, location);
            console.log(registeredUser);
            if (registeredUser.isSuccessfullExecution) {
                const content = 'Random order content';
                
                const orderedBy = (registeredUser.result as any)[0].id;
    
                const orderState = await this.OrderDAO.createOrder(content, orderedBy, location);
                if (!orderState.isSuccessfullExecution) {
                    return orderState;
                }
            } else {
                return registeredUser;
            }
        }
        return this.getAllOrders(req, res);
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
        const response = await this.OrderDAO.deleteOrderById(req.body.id)
        return response;
    }
}

export default OrderService;