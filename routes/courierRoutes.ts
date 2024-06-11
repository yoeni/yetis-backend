import RequestController, { controlType } from "../utils/RequestController";
import { serviceEnums, courierEnums } from "../utils/serviceEnums";

class CourierRoutes {
    private Controller: RequestController;

    constructor() {
        this.Controller = new RequestController(serviceEnums.courierService);
    }

    public setRoutes(apiRouter: any){
        
        apiRouter.get('/couriers', (req, res) => this.Controller.useController(req, res, [controlType.auth],courierEnums.getAllCouriers));
        apiRouter.get('/courier/id/:id', (req, res) => this.Controller.useController(req, res, [controlType.auth],courierEnums.getCourierById));
        apiRouter.get('/courier/order/:id', (req, res) => this.Controller.useController(req, res, [controlType.auth],courierEnums.getCourierOrders));
        
        apiRouter.delete('/courier/delete', (req, res) => this.Controller.useController(req, res, [controlType.auth],courierEnums.deleteCourierById));
    }
}

export default new CourierRoutes();