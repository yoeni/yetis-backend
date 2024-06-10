import AssesmentService from '../services/assesmentService';
import ChatService from '../services/chatService';
import DateService from '../services/dateService';
import MaterialService from '../services/materialService';
import UserService from '../services/userService';

import MessageHandler from './general/messageHandler';
import { assessmentEnums, chatEnums, dateEnums, materialEnums, serviceEnums, userEnums } from './serviceEnums';

class ServiceController extends MessageHandler {
    private userService: UserService;
    private assessmentService: AssesmentService;
    private dateService: DateService;
    private materialService: MaterialService;
    private chatService: ChatService;
    private service:serviceEnums;

    constructor(service: serviceEnums) {
        super();
        this.userService = new UserService();
        this.assessmentService = new AssesmentService();
        this.dateService = new DateService();
        this.materialService = new MaterialService();
        this.chatService = new ChatService();
        this.service = service;
    }
    
    async RunService(req, res, serviceType: userEnums | assessmentEnums | dateEnums | materialEnums | chatEnums){
        let response = await this[serviceEnums[this.service]].runServiceFunction(serviceType,req, res);
        
        if (response.isSuccessfullExecution) {
            return this.RequestControllerMessage(true, response.result);
        } else {
            return this.RequestControllerMessage(true, response.errMessage, 500);
        }
    }

}
export default ServiceController;