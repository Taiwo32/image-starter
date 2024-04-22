require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

 
// product router
const productRouter = require("./routes/productRoutes");

app.use(express.static("./public"));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.get("/", (req, res) => {
  res.send("<h1>File Upload Starter</h1>");
});

app.use("/api/v1/products", productRouter);

module.exports = app