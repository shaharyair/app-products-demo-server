const express = require("express");
const cors = require("cors");
const productsRouter = require("./routers/productsRouter");
const globalErrorHandler = require("./middleware/globalErrorHandler");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/products", productsRouter);

app.use(globalErrorHandler);

module.exports = app;
