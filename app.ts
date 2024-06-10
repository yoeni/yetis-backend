import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Router from './router';
import session from 'express-session';
import cors from 'cors';
import config from './config'
const app = express();
const apiRouter = express.Router();

const corsOptions ={
    origin: config.CLIENT_URL,
    credentials: true,
    optionSuccessStatus: 200,
    exposedHeaders: 'x-auth-token'
}
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.locals.startEpoch = Date.now();
    next();
})
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: config.EXPRESS_SESSION_SECRET ,
resave: false,
saveUninitialized: true,
cookie: {httpOnly: false}}));

// API router init
new Router(apiRouter);

app.use(apiRouter);

app.listen(4000);