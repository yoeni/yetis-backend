import AuthService from "../services/authService";


class AuthRoutes {
    private AuthService: AuthService;

    constructor() {
        this.AuthService = new AuthService();
    }

    public setRoutes(apiRouter: any){
        apiRouter.post('/auth/username', (req, res) => this.AuthService.loginWithUsername(req, res));
        apiRouter.post('/auth/email', (req, res) => this.AuthService.loginWithEmail(req, res));
        apiRouter.post('/auth/verify', (req, res) => this.AuthService.verifyToken(req,res));

    }
}

export default new AuthRoutes();