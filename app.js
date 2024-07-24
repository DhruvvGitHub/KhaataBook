const express = require('express');
const app = express();
const db = require('./config/mongoose-config');

const path = require('path');

const connectFlash = require('connect-flash');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: "secret"
    })
)

require('dotenv').config();
app.use(connectFlash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.set("view engine", "ejs");

const indexRouter = require("./routes/index-router");
const hisaabRouter = require("./routes/hisaab-router");

app.use("/", indexRouter);
app.use("/hisaab", hisaabRouter);

app.listen(3000);
