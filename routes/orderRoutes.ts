import RequestController, { controlType } from "../utils/RequestController";
import { serviceEnums, orderEnums } from "../utils/serviceEnums";

class UserRoutes {
    private Controller: RequestController;

    constructor() {
        this.Controller = new RequestController(serviceEnums.orderService);
    }

    public setRoutes(apiRouter: any){
        
        apiRouter.get('/orders', (req, res) => this.Controller.useController(req, res, [controlType.auth],orderEnums.getAllOrders));
        apiRouter.get('/order/id/:id', (req, res) => this.Controller.useController(req, res, [controlType.auth],orderEnums.getOrderById));
        apiRouter.get('/order/courier/:id', (req, res) => this.Controller.useController(req, res, [controlType.auth],orderEnums.getOrderByCourier));
        
        apiRouter.post('/order/create', (req, res) => this.Controller.useController(req, res, [],orderEnums.createOrder));

        apiRouter.put('/order/assign', (req, res) => this.Controller.useController(req, res, [controlType.auth],orderEnums.assignOrder));
        apiRouter.put('/order/status', (req, res) => this.Controller.useController(req, res, [controlType.auth],orderEnums.updateOrderStatus));
        
        apiRouter.delete('/order/id/:id', (req, res) => this.Controller.useController(req, res, [controlType.auth],orderEnums.deleteOrderById));
    }
}

export default new UserRoutes();