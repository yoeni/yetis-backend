import UserRoutes from "./routes/userRoutes";
import AuthRoutes from "./routes/authRoutes";
import ErrorHandler from "./utils/general/errorHandler";
import config from "./config";
import orderRoutes from "./routes/orderRoutes";
import courierRoutes from "./routes/courierRoutes";
class Router {
    private apiRouter: any;
    constructor(apiRouter) {
        this.apiRouter = apiRouter;
        this.allowCors();
        this.initApiRouter();
    }

    initApiRouter() {
        AuthRoutes.setRoutes(this.apiRouter);
        UserRoutes.setRoutes(this.apiRouter);
        orderRoutes.setRoutes(this.apiRouter);
        courierRoutes.setRoutes(this.apiRouter);
        // Fix me. Will not catch errors thrown inside an async function
        ErrorHandler.initErrorhandlingMiddleWare(this.apiRouter)
    }

    allowCors() {
        this.apiRouter.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', config.CLIENT_URL);
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }
}

export default Router