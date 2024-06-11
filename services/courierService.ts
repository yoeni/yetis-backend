import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import CourierDAO from "../data_access/courierDAO";
import { courierEnums } from "../utils/serviceEnums";

class CourierService {
    private CourierDAO: CourierDAO;
    constructor() {
        this.CourierDAO = new CourierDAO();
    }

    async runServiceFunction(type: courierEnums, req, res){
        return await this[courierEnums[type]](req,res)
    }
    private async getAllCouriers(req, res) {
        const response = await this.CourierDAO.getAllCouriers();
        return response;
    }
    private async getCourierById(req,res) {
        const response = await this.CourierDAO.getCourierById(req.params.id)
        return response;
    }
    private async getCourierOrders(req,res) {
        const response = await this.CourierDAO.getCourierOrders(req.params.id)
        return response;
    }
    private async deleteCourierById(req,res){
        const response = await this.CourierDAO.deleteCourierById(req.body.id)
        return response;
    }
}

export default CourierService;