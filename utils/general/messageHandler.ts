
interface returnMessage {
    isSuccessfullExecution: boolean;
    errno?: number;
    errMessage?: string;
    result?: string;
}
interface controllerReturnMessage {
    isResponse: boolean;
    header?: any;
    code: number;
    result: any;
}
export default class MessageHandler {
    constructor() {
    }
    errorMessageObj(err) {
        return {
            isSuccessfullExecution: false,
            errMessage: err.detail,
            errno: err.code,
        } as returnMessage;
    }
    customErrorMessageObj(customErr) {
        return {
            isSuccessfullExecution: false,
            errMessage: customErr.errorMessage,
            errno: customErr.errorNumber,
        } as returnMessage;
    }
    successMessageObj(data) {
        return {
            isSuccessfullExecution: true,
            result: data,
        } as returnMessage;
    }
    
    RequestControllerMessage(isResponse: boolean, data: any = '', code: number = 200) {
        return {
            isResponse: isResponse,
            result: data,
            code: code
        } as controllerReturnMessage;
    }
}