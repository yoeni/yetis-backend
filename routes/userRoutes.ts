import RequestController, { controlType } from "../utils/RequestController";
import { serviceEnums, userEnums } from "../utils/serviceEnums";

class UserRoutes {
    private Controller: RequestController;

    constructor() {
        this.Controller = new RequestController(serviceEnums.userService);
    }

    public setRoutes(apiRouter: any){
        
        apiRouter.get('/users', (req, res) => this.Controller.useController(req, res, [controlType.auth],userEnums.getAllUsers));
        apiRouter.get('/user/id/:id', (req, res) => this.Controller.useController(req, res, [controlType.auth],userEnums.getUserById));
        apiRouter.get('/user/email/:email', (req, res) => this.Controller.useController(req, res, [controlType.auth],userEnums.getUserByEmail));
        apiRouter.get('/user/username/:username', (req, res) => this.Controller.useController(req, res, [controlType.auth],userEnums.getUserByUsername));
        
        apiRouter.post('/user/signup', (req, res) => this.Controller.useController(req, res, [],userEnums.addUser));
        apiRouter.post('/user/forgotpassword', (req, res) => this.Controller.useController(req, res, [],userEnums.userForgotPassword));
        
        apiRouter.put('/user/profile', (req, res) => this.Controller.useController(req, res, [controlType.auth],userEnums.updateUserData));
        apiRouter.put('/user/location', (req, res) => this.Controller.useController(req, res, [controlType.auth],userEnums.updateUserLocation));
        apiRouter.put('/user/updatepassword', (req, res) => this.Controller.useController(req, res, [controlType.auth],userEnums.updatePasswordUserById));
        apiRouter.put('/user/token', (req, res) => this.Controller.useController(req, res, [controlType.auth],userEnums.updatePasswordUserByToken));
        apiRouter.put('/user/email', (req, res) => this.Controller.useController(req, res, [controlType.auth],userEnums.updatePasswordUserByEmail));
        apiRouter.put('/user/username', (req, res) => this.Controller.useController(req, res, [controlType.auth],userEnums.updatePasswordUserByUsername));
        
        apiRouter.delete('/user/id/:id', (req, res) => this.Controller.useController(req, res, [controlType.auth],userEnums.deleteUserById));
        // apiRouter.delete('/user/email/:email', (req, res) => this.Controller.useController(req, res, [controlType.auth],userEnums.deleteUserByEmail));
        // apiRouter.delete('/user/username/:username', (req, res) => this.Controller.useController(req, res, [controlType.auth],userEnums.deleteUserByUsername));
    }
}

export default new UserRoutes();