const express = require("express");
const productsRouter = require("./routers/productsRouter");

const app = express();

app.use(express.json());

app.use("/api/products", productsRouter);

module.exports = app;
