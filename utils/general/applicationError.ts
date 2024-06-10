class ApplicationError extends Error {
    private errorCode: number;
    private status: any;
    constructor(message: string, errorCode: number, status: any) {
        super(message)
        this.errorCode = errorCode
        this.status = status || 500
    }

    getMessage() {
        return this.message
    }

    getErrorCode() {
        return this.errorCode
    }

    getStatus() {
        return this.status
    }

    getError() {
        return {
            error_code: this.errorCode,
            error_message: this.message
        }
    }
}

export default ApplicationError