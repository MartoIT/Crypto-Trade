const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();
const port = 5000;
const router = require('./routers');
const authMiddleware = require('./authMiddlewar/authMiddleware');

const setupViewEngine = require('./config/viewEngine');
const dataBase = require('./config/dataBase');

setupViewEngine(app);
app.use('/static', express.static('public') );
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(authMiddleware.authentication)
app.use(router);

dataBase()
.then(() => app.listen(port, () => console.log(`Server is listen on a port ${port}...`) ))
.catch((err) => console.log(err.message));