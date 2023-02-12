const express = require('express');

const app = express();
const port = 5000;
const router = require('./routers');

const setupViewEngine = require('./config/viewEngine');
const dataBase = require('./config/dataBase');

setupViewEngine(app);
app.use(express.static('public') );
app.use(express.urlencoded({extended: false}));
app.use(router);

dataBase()
.then(() => app.listen(port, () => console.log(`Server is listen on a port ${port}...`) ))
.catch((err) => console.log(err.message));