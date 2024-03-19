const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

// Increase the JSON request size limit
app.use(express.json({ limit: '1000mb' }));

// Increase the form data (multipart/form-data) request size limit
app.use(express.urlencoded({ limit: '1000mb', extended: true }));

app.use(cookieParser());

app.use("/test", (req, res) => {
  res.send("Hello world!");
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// import routes
const user = require("./controller/user");
app.use("/api/v2/user", user);

const mymodule = require("./controller/mymodule");
app.use("/api/v2/module", mymodule);

const mymenu = require("./controller/mymenu");
app.use("/api/v2/menu", mymenu);





// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;