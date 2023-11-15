const express = require("express");
const productsRouter = require("./routers/productsRouter");
const globalErrorHandler = require("./middleware/globalErrorHandler");

const app = express();

app.use(express.json());

app.use("/api/products", productsRouter);

app.use(globalErrorHandler);

module.exports = app;
