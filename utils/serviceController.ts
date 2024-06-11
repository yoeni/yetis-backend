import UserService from '../services/userService';
import OrderService from '../services/orderService';
import CourierService from '../services/courierService';
import MessageHandler from './general/messageHandler';
import { courierEnums, orderEnums, serviceEnums, userEnums } from './serviceEnums';

class ServiceController extends MessageHandler {
    private userService: UserService;
    private orderService: OrderService;
    private courierService: CourierService;
    
    private service:serviceEnums;

    constructor(service: serviceEnums) {
        super();
        this.userService = new UserService();
        this.orderService = new OrderService();
        this.courierService = new CourierService();
        this.service = service;
    }
    
    async RunService(req, res, serviceType: userEnums | orderEnums | courierEnums){
        let response = await this[serviceEnums[this.service]].runServiceFunction(serviceType,req, res);
        
        if (response.isSuccessfullExecution) {
            return this.RequestControllerMessage(true, response.result);
        } else {
            return this.RequestControllerMessage(true, response.errMessage, 500);
        }
    }

}
export default ServiceController;