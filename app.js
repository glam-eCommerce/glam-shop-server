/* 

================== Most Important ==================
* Issue 1 :
In uploads folder you need create 3 folder like bellow.
Folder structure will be like: 
public -> uploads -> 1. products 2. customize 3. categories
*** Now This folder will automatically create when we run the server file

* Issue 2:
For admin signup just go to the auth 
controller then newUser obj, you will 
find a role field. role:1 for admin signup & 
role: 0 or by default it for customer signup.
go user model and see the role field.

*/

const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Redis = require("ioredis");

// Import Router
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/categories");
const productRouter = require("./routes/products");
const brainTreeRouter = require("./routes/braintree");
const orderRouter = require("./routes/orders");
const usersRouter = require("./routes/users");
const customizeRouter = require("./routes/customize");
// Import Auth middleware for check user login or not~
const { loginCheck } = require("./middleware/auth");
const CreateAllFolder = require("./config/uploadFolderCreateScript");

/* Create All Uploads Folder if not exists | For Uploading Images */
CreateAllFolder();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    // ssl:true,
    // sslValidate: true,
    // sslCA: `rds-combined-ca-bundle.pem`,
    // sslAllowInvalidHostnames: true,
    // tls:true,
    // tlsCAFile: `global-bundle.pem`,
    // tlsAllowInvalidHostnames:true,
    // tlsAllowInvalidCertificates:true
  })
  .then(() =>
    console.log(
      "==============Mongodb Database Connected Successfully=============="
    )
  )
  .catch((err) => console.log("Database Not Connected !!! " + err));

const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || 6379,
});



// console.log("check if promo exists in redis....");
redisClient.get("promo").then((result)=>{
  if(result){
    console.log("Promos already exists in redis");
  }else{
    console.log("Promos not exists in redis");
    console.log("Setting promos to redis...");
    redisClient.set("promo","Get 10% off your first purchase when you sign up for our newsletter!");
  }
}) 

// Middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api", brainTreeRouter);
app.use("/api/order", orderRouter);
app.use("/api/customize", customizeRouter);

// Test application
app.get("/", (req, res) => {
  res.send("Glam Ecommerce API is working");
});

app.get("/promo", (req, res) => {
  redisClient.get("promo").then((result)=>{
    if(result){
      console.log("Promo from redis");
      res.status(200).send(result);
    }else{
      res.status(200).send("Promo not exists in redis");
    }
  }) 
});

// Run Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
