import { serverAuth } from "./auth";
import RedisSerivce from "./redis";
import ServiceController from "./serviceController";
import {  serviceEnums, userEnums, orderEnums, courierEnums } from "./serviceEnums";
export enum controlType{
    auth,
    cacheCheck
}
class RequestController {
    private RedisCache:RedisSerivce; 
    private ServiceController:ServiceController;

    constructor(serviceType: serviceEnums) {
        this.RedisCache =  RedisSerivce.getInstance();
        this.ServiceController  = new ServiceController(serviceType)
    }

    public async useController(req,res, types: controlType[], service:  userEnums | orderEnums | courierEnums){
        let result = { isResponse: false, code: 200, result: '' };
        for (let i = 0; i < types.length; i++) {
            const type = types[i];
            switch (type){
                case controlType.auth:{ result = serverAuth(req); break; }
                case controlType.cacheCheck:{ result = await this.RedisCache.getCache(req.path); break; }
            }
            if (result.isResponse) {
                res.status(result.code).send(result.result);
                break;
            }
        }
        if (!result.isResponse){
            result = await this.ServiceController.RunService(req,res, service);
            if (result.code == 200){
                if (types.includes(controlType.cacheCheck))
                    this.RedisCache.setCache(req.path, result.result);
                
            }
            res.status(result.code).send(result.result);
        }
        
    }

}
export default RequestController;