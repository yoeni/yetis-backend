class ErrorHandler {
    public static initErrorhandlingMiddleWare(apiRouter: any) {
        apiRouter.use( async (err, req, res, next) => {
            res.status(500).send()
        })
    }
}

export default ErrorHandler